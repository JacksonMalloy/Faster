import db from '../../db/config'

type CreateOrderArgs = {
  adminId: number
  customerId: number
  total: string
  charge: string
  tenantId: number
}

export default class OrderRepository {
  async createMenuOrder(args: CreateOrderArgs) {
    const { adminId, customerId, total, charge, tenantId } = args
    const query = `INSERT INTO "fm"."orders" (adminId, customerId, total, charge, tenantId) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const params = [adminId, customerId, total, charge, tenantId]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Order created!',
        success: true,
        order: result.rows[0],
      }
    } catch (error) {
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
      }
    }
  }
}
