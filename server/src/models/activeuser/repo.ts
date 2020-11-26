import db from '../../db/config'
import { keysToCamel } from '../../utils'

export default class ActiveUserRepository {
  async getAdminById(adminId: number) {
    const query = `SELECT * FROM "fm"."admins" WHERE admin_id = $1`
    const params = [adminId]

    try {
      const result = await db.query(query, params)

      console.log(result.rows[0])

      return keysToCamel(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  async getCustomerById(customerId: number) {
    const query = `SELECT * FROM "fm"."customers" WHERE customer_id = $1`
    const params = [customerId]

    const getTenantsByCustomerId = async (customerId: number) => {
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

      const params = [customerId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    }

    try {
      const result = await db.query(query, params)
      const customerId = result.rows[0].customer_id
      const tenants = await getTenantsByCustomerId(customerId)

      return Object.assign(keysToCamel(result.rows[0]), { tenants })
    } catch (error) {
      throw error
    }
  }
}
