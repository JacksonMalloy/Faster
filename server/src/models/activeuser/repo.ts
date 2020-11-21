import db from '../../db/config'

export default class ActiveUserRepository {
  async getAdminById(admin_id: number) {
    const query = `SELECT * FROM "fm"."admins" WHERE admin_id = $1`
    const params = [admin_id]

    try {
      const result = await db.query(query, params)

      return result.rows[0]
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
}
