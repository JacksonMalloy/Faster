import db from '../../db/config'
import { hash, compare } from 'bcryptjs'
import { createToken } from '../../utils'
import { update } from '../../helpers'

type RegistrationArgs = {
  phone: string
  email: string
  name: string
}

type LoginArgs = {
  email: string
  pin: string
  phone: string
}

type ConnectCustomerWithOrgArgs = {
  customerId: number
  tenantId: number
}

export default class CustomerRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getCustomersByTenant(tenantId: number) {
    const query = `
            SELECT
                    *
              FROM
                    "fm"."customers_to_tenants" c2o
            INNER JOIN
                    "fm"."customers" c
                  ON c2o.customerId = c.customerId
            INNER JOIN
                  "fm"."tenants" o
                  ON c2o.tenantId = o.tenantId
            WHERE o.tenantId = $1`

    const params = [tenantId]

    try {
      const result = await db.query(query, params)

      //console.log(result)
      return result.rows
    } catch (error) {
       throw error
    }
  }

  async getCustomerById(customerId: number) {
    const query = `SELECT * FROM "fm"."customers" WHERE customerId = $1`
    const params = [customerId]

    const getTenantsByCustomerId = async (customerId: number) => {
      const query = `
        SELECT
              o.name,
              o.tenantId
        FROM
              "fm"."customers_to_tenants" c2o
        INNER JOIN
              "fm"."customers" c
            ON c2o.customerId = c.customerId
        INNER JOIN
            "fm"."tenants" o
            ON c2o.tenantId = o.tenantId
        WHERE c.customerId = $1`

      const params = [customerId]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
           throw error
      }
    }

    try {
      const result = await db.query(query, params)
      const customerId = result.rows[0].customerId
      const tenants = await getTenantsByCustomerId(customerId)

      return Object.assign(result.rows[0], { tenants })
    } catch (error) {
       throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////
  async registerCustomer(args: RegistrationArgs) {
    const { phone, email, name } = args

    console.log({ args })

    // REGISTER WITH EMAIL
    if (!phone) {
      const query = `INSERT INTO "fm"."customers" (email, name) VALUES ($1, $2) RETURNING *`
      const params = [email, name]

      try {
        const result = await db.query(query, params)

        if (result.rowCount === 0) {
          const getCustomer = async () => {
            const query = `SELECT * FROM "fm"."customers" WHERE email = $1`
            const params = [email, name]
            try {
              const result = await db.query(query, params)

              return result.rows[0]
            } catch (error) {
                       throw error
            }
          }

          return {
            code: 409,
            message: 'A user with this phone and email already exists.',
            success: false,
            customer: await getCustomer(),
          }
        }

        return { code: 201, message: 'User created.', success: true, customer: result.rows[0] }
      } catch (error) {
           throw error
      }
    }

    const getCustomer = async (phone: string) => {
      const query = `SELECT * FROM "fm"."customers" WHERE phone = $1`
      const params = [phone]
      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
           throw error
      }
    }

    // REGISTER WITH PHONE
    if (!email) {
      const getCustomerData = await getCustomer(phone)
      console.log({ getCustomerData })

      if (getCustomerData.length === 0) {
        const query = `INSERT INTO "fm"."customers" (phone, name) VALUES ($1, $2) RETURNING *`
        const params = [phone, name]
        console.info('REGISTER WITH PHONE')

        try {
          const result = await db.query(query, params)
          console.log({ result })

          return { code: 201, message: 'User created.', success: true, customer: result.rows[0] }
        } catch (error) {
               throw error
        }
      }

      return {
        code: 200,
        message: 'Successfully Registered',
        success: true,
        customer: getCustomerData[0],
      }
    }

    return {
      code: 409,
      message: 'A user with this phone and email already exists.',
      success: false,
      customer: await getCustomer(phone),
    }
  }

  async loginCustomer(args: LoginArgs) {
    const { email, pin, phone } = args

    const getPin = async (customerId: string) => {
      const query = `SELECT * FROM "fm"."sms" WHERE customerId = $1`
      const params = [customerId]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
           throw error
      }
    }

    const getCustomer = async () => {
      const query = `SELECT * FROM "fm"."customers" WHERE email = $1 OR phone = $2`
      const params = [email, phone]
      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
        console.log(error)
      }
    }

    try {
      const [{ customerId, phone, email }]: any = await getCustomer()
      const [{ body }] = await getPin(customerId)

      // Change in production - strip body test copy
      const currentPin = body.replace('Sent from your Twilio trial account - ', '')
      const fields = { phone, email, pin: currentPin }
      const conditions = { customerId }

      const { query, params } = update(`"fm"."customers"`, conditions, fields)
      const result = await db.query(query, params)

      if (result.rows.length === 0) {
        console.info('USER DOES NOT EXIST')
        return {
          code: 404,
          message: `User does not exist!`,
          success: false,
          customer: {},
        }
      }

      // Change in production - strip body test copy
      const formatPin = pin.replace('Sent from your Twilio trial account - ', '')

      // Check for PIN
      if (formatPin !== currentPin) {
        console.info('INVALID PIN')
        return {
          code: 401,
          message: 'Invalid pin!',
          success: false,
          customer: {},
        }
      }

      const token = createToken(result.rows[0].customerId)

      return {
        code: 200,
        message: 'Successfully logged in!',
        success: true,
        customer: Object.assign(result.rows[0], { token }),
      }
    } catch (error) {
      return {
        code: 503,
        message: `Sorry!`,
        success: false,
        customer: {},
      }
    }
  }

  async connectCustomerToTenant(args: ConnectCustomerWithOrgArgs) {
    const { customerId, tenantId } = args

    const query = `INSERT INTO "fm"."customers_to_tenants" (customerId, tenantId) VALUES ($1, $2) RETURNING *`
    const params = [customerId, tenantId]

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Successfully joined tenant!',
        success: true,
        connection: {
          connect: result.rows,
        },
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
        customer: {},
      }
    }
  }

  async deleteCustomer(customerId: number) {
    const query = `DELETE FROM "fm"."customers" WHERE customerId = $1`
    const params = [customerId]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The account no longer exists!',
          success: false,
          customer: {},
        }
      } else {
        return {
          code: 204,
          message: 'The account was deleted',
          success: true,
          customer: {
            customerId: customerId,
          },
        }
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
        customer: {},
      }
    }
  }
}
