const { hash, compare } = require('bcryptjs')
const { createToken } = require('../../utils')

const getCustomersByOrganization = async ({ organization_id }, context) => {
  const query = `
          SELECT
                  *
            FROM
                  "fm"."customers_to_organizations" c2o
          INNER JOIN
                  "fm"."customers" c
                ON c2o.customer_id = c.customer_id
          INNER JOIN
                "fm"."organizations" o
                ON c2o.organization_id = o.organization_id
          WHERE o.organization_id = $1`

  const params = [organization_id]

  try {
    const result = await context.pool.query(query, params)

    //console.log(result)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getCustomerById = async ({ customer_id }, context) => {
  const query = `SELECT * FROM "fm"."customers" WHERE customer_id = $1`
  const params = [customer_id]

  const getOrganizationsByCustomerId = async (customer_id) => {
    const query = `
      SELECT
            o.name,
            o.organization_id
      FROM
            "fm"."customers_to_organizations" c2o
      INNER JOIN
            "fm"."customers" c
          ON c2o.customer_id = c.customer_id
      INNER JOIN
          "fm"."organizations" o
          ON c2o.organization_id = o.organization_id
      WHERE c.customer_id = $1`

    const params = [customer_id]

    try {
      const result = await context.pool.query(query, params)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  try {
    const result = await context.pool.query(query, params)
    const customer_id = result.rows[0].customer_id
    const organizations = await getOrganizationsByCustomerId(customer_id)

    return Object.assign(result.rows[0], { organizations })
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const registerCustomer = async ({ phone, email, name, password }, context) => {
  const query = `INSERT INTO "fm"."customers" (phone, email, name, password) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *`

  const hashedPassword = await hash(password, 10)
  const params = [phone, email, name, hashedPassword]

  try {
    const result = await context.pool.query(query, params)
    // Return null if account phone/email already exists
    if (result.rowCount === 0) {
      throw new Error('A Customer with that email already exists!')
    }

    const token = createToken(result.rows[0].customer_id)
    //console.log(`CUSTOMER TOKEN GENERATED: `, token)

    return Object.assign(result.rows[0], { token })
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const loginCustomer = async ({ email, password }, context) => {
  const query = `SELECT * FROM "fm"."customers" WHERE email = $1`
  const params = [email]

  const getOrganizationsByCustomerId = async (customer_id) => {
    const query = `
      SELECT
            o.name
      FROM
            "fm"."customers_to_organizations" c2o
      INNER JOIN
            "fm"."customers" c
          ON c2o.customer_id = c.customer_id
      INNER JOIN
          "fm"."organizations" o
          ON c2o.organization_id = o.organization_id
      WHERE c.customer_id = $1`
    const params = [customer_id]

    try {
      const result = await context.pool.query(query, params)

      //console.log(result.rows)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  try {
    const result = await context.pool.query(query, params)
    const customer_id = result.rows[0].customer_id
    const test = await getOrganizationsByCustomerId(customer_id)

    //console.log(`TEST`, test)

    if (result.rows.length === 0) {
      throw new Error(`No customer found for email: ${email}`)
    }

    const passwordValid = await compare(password, result.rows[0].password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }

    const token = createToken(result.rows[0].customer_id)
    //console.log(`TOKEN GENERATED: `, token)

    return Object.assign(result.rows[0], { token })
  } catch (error) {
    //console.log(error)
    throw error
  }
}

// @@TODO TEST
const connectCustomerToOrganization = async ({ customer_id, organization_id }, context) => {
  const query = `INSERT INTO "fm"."customers_to_organizations" (customer_id, organization_id) VALUES ($1, $2) RETURNING *`
  const params = [customer_id, organization_id]

  try {
    const result = await context.pool.query(query, params)
    //console.log(result)

    // if (result.rows.length === 0) {
    //   throw new Error(`No customer found for email: ${email}`);
    // }

    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const deleteCustomer = async ({ customer_id }, context) => {
  const query = `DELETE FROM "fm"."customers" WHERE customer_id = $1`
  const params = [customer_id]

  try {
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('A Customer with that ID does not exist!')
    } else {
      //console.log(`DELETED CUSTOMER WITH ID = ${customer_id}`)
      return {
        customer_id: customer_id,
      }
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = {
  getCustomerById,
  getCustomersByOrganization,
  registerCustomer,
  loginCustomer,
  connectCustomerToOrganization,
  deleteCustomer,
}
