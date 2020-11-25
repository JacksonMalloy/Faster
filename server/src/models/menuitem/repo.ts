import db from '../../db/config'
import { update } from '../../helpers'
import { keysToCamel } from '../../utils'

type CreateItemArgs = {
  menuId: number
  headerId: number | null
  basePrice: string
  description: string
  name: string
}

type UpdateItemArgs = {
  menuId: number
  itemId: number
  headerId: number
  basePrice: string
  description: string
  name: string
}

export default class MenuItemRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getAllMenuItemsByTenantId(tenantId: number) {
    const query = `
        SELECT
            mi.item_id,
            mi.menu_id,
            mi.base_price,
            mi.description,
            mi.name

          FROM "fm"."items" mi
          JOIN "fm"."menus" m ON m.menu_id = mi.menu_id
          JOIN "fm"."tenants" o ON o.tenant_id = m.tenant_id
          WHERE o.tenant_id = $1`

    const params = [tenantId]

    try {
      const result = await db.query(query, params)

      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  async getAllMenuItemsByMenu(menuId: number) {
    const query = `SELECT * FROM "fm"."items" WHERE menu_id = $1`
    const params = [menuId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  async getMenuItemById(itemId: number) {
    const query = `SELECT * FROM "fm"."items" WHERE item_id = $1`
    const params = [itemId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async createMenuItem({ menuId, basePrice, headerId, description, name }: CreateItemArgs) {
    try {
      const query = `INSERT INTO "fm"."items" (menu_id, base_price, description, name, header_id)
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`
      const params = [menuId, basePrice, description, name, headerId]
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu item created!',
        success: true,
        menuItem: keysToCamel(result.rows[0]),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async updateMenuItem({ menuId, itemId, headerId, basePrice, description, name }: UpdateItemArgs) {
    const fields = { menuId, headerId, basePrice, description, name }
    const conditions = { itemId }

    const { query, params } = update(`"fm"."items"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Menu item updated!',
        success: true,
        menuItem: keysToCamel(result.rows[0]),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async deleteMenuItem(itemId: number) {
    const query = `DELETE FROM "fm"."items" WHERE item_id = $1`
    const params = [itemId]

    try {
      const result = await db.query(query, params)
      console.info({ result })

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu item no longer exists!',
          success: false,
        }
      } else {
        return {
          code: 204,
          message: 'The menu item was deleted',
          success: true,
        }
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
