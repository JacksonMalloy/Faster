import db from '../../db/config'

type CreateOrderArgs = {
  admin_id: number
  customer_id: number
  total: string
  charge: string
  tenant_id: number
}

export default class OrderRepository {
  async createMenuOrder(args: CreateOrderArgs) {
    const { admin_id, customer_id, total, charge, tenant_id } = args
    const query = `INSERT INTO "fm"."orders" (admin_id, customer_id, total, charge, tenant_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const params = [admin_id, customer_id, total, charge, tenant_id]

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
