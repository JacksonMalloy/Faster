import db from '../../db/config'

export default class ActiveUserRepository {
  async getAdminById(adminId: number) {
    const query = `SELECT * FROM "fm"."admins" WHERE adminId = $1`
    const params = [adminId]

    try {
      const result = await db.query(query, params)

      return result.rows[0]
    } catch (error) {
      //console.log(error)
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
        //console.log(error)
        throw error
      }
    }

    try {
      const result = await db.query(query, params)
      const customerId = result.rows[0].customerId
      const tenants = await getTenantsByCustomerId(customerId)

      return Object.assign(result.rows[0], { tenants })
    } catch (error) {
      //console.log(error)
      throw error
    }
  }
}
