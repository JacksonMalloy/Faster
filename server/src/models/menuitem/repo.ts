import db from '../../db/config'
import { update } from '../../helpers'

type CreateItemArgs = {
  menu_id: number
  header_id: number | null
  base_price: string
  description: string
  name: string
}

type UpdateItemArgs = {
  menu_id: number
  item_id: number
  header_id: number
  base_price: string
  description: string
  name: string
}

export default class MenuItemRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getAllMenuItemsByTenantId(tenant_id: number) {
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

    const params = [tenant_id]

    try {
      const result = await db.query(query, params)

      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getAllMenuItemsByMenu(menu_id: number) {
    const query = `SELECT * FROM "fm"."items" WHERE menu_id = $1`
    const params = [menu_id]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuItemById(item_id: number) {
    const query = `SELECT * FROM "fm"."items" WHERE item_id = $1`
    const params = [item_id]

    try {
      const result = await db.query(query, params)
      //console.log(result)
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async createMenuItem({ menu_id, base_price, header_id, description, name }: CreateItemArgs) {
    try {
      const query = `INSERT INTO "fm"."items" (menu_id, base_price, description, name, header_id)
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`
      const params = [menu_id, base_price, description, name, header_id]
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu item created!',
        success: true,
        menu_item: result.rows[0],
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

  async updateMenuItem({ menu_id, item_id, header_id, base_price, description, name }: UpdateItemArgs) {
    const fields = { menu_id, header_id, base_price, description, name }
    const conditions = { item_id }

    const { query, params } = update(`"fm"."items"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Menu item updated!',
        success: true,
        menu_item: result.rows[0],
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

  async deleteMenuItem(item_id: number) {
    const query = `DELETE FROM "fm"."items" WHERE item_id = $1`
    const params = [item_id]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu item no longer exists!',
          success: false,
        }
      } else {
        //console.log(`DELETED ITEM WITH ID = ${item_id}`)
        return {
          code: 204,
          message: 'The menu item was deleted',
          success: true,
          menu_item: {
            item_id: item_id,
          },
        }
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
