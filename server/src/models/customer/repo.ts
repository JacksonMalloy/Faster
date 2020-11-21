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
  customer_id: number
  tenant_id: number
}

export default class CustomerRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getCustomersByTenant(tenant_id: number) {
    const query = `
            SELECT
                    *
              FROM
                    "fm"."customers_to_tenants" c2o
            INNER JOIN
                    "fm"."customers" c
                  ON c2o.customer_id = c.customer_id
            INNER JOIN
                  "fm"."tenants" o
                  ON c2o.tenant_id = o.tenant_id
            WHERE o.tenant_id = $1`

    const params = [tenant_id]

    try {
      const result = await db.query(query, params)

      //console.log(result)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getCustomerById(customer_id: number) {
    const query = `SELECT * FROM "fm"."customers" WHERE customer_id = $1`
    const params = [customer_id]

    const getTenantsByCustomerId = async (customer_id: number) => {
      const query = `
        SELECT
              o.name,
              o.tenant_id
        FROM
              "fm"."customers_to_tenants" c2o
        INNER JOIN
              "fm"."customers" c
            ON c2o.customer_id = c.customer_id
        INNER JOIN
            "fm"."tenants" o
            ON c2o.tenant_id = o.tenant_id
        WHERE c.customer_id = $1`

      const params = [customer_id]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    }

    try {
      const result = await db.query(query, params)
      const customer_id = result.rows[0].customer_id
      const tenants = await getTenantsByCustomerId(customer_id)

      return Object.assign(result.rows[0], { tenants })
    } catch (error) {
      //console.log(error)
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
              //console.log(error)
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
        //console.log(error)
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
        //console.log(error)
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
          //console.log(error)
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

    const getPin = async (customer_id: string) => {
      const query = `SELECT * FROM "fm"."sms" WHERE customer_id = $1`
      const params = [customer_id]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
        //console.log(error)
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
      const [{ customer_id, phone, email }]: any = await getCustomer()
      const [{ body }] = await getPin(customer_id)

      // Change in production - strip body test copy
      const currentPin = body.replace('Sent from your Twilio trial account - ', '')
      const fields = { phone, email, pin: currentPin }
      const conditions = { customer_id }

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

      const token = createToken(result.rows[0].customer_id)

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
    const { customer_id, tenant_id } = args

    const query = `INSERT INTO "fm"."customers_to_tenants" (customer_id, tenant_id) VALUES ($1, $2) RETURNING *`
    const params = [customer_id, tenant_id]

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
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        customer: {},
      }
    }
  }

  async deleteCustomer(customer_id: number) {
    const query = `DELETE FROM "fm"."customers" WHERE customer_id = $1`
    const params = [customer_id]

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
            customer_id: customer_id,
          },
        }
      }
    } catch (error) {
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        customer: {},
      }
    }
  }
}
