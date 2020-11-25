import db from '../../db/config'
import { keysToCamel } from '../../utils'

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
    const query = `INSERT INTO "fm"."orders" (admin_id, customer_id, total, charge, tenant_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const params = [adminId, customerId, total, charge, tenantId]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Order created!',
        success: true,
        order: keysToCamel(result.rows[0]),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }
}
