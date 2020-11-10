import db from '../../db/config'
import { update } from '../../helpers'

type CreateItemArgs = {
  menu_id: number
  menu_header_id: number | null
  base_price: string
  description: string
  name: string
}

type UpdateItemArgs = {
  menu_id: number
  menu_item_id: number
  menu_header_id: number
  base_price: string
  description: string
  name: string
}

export default class MenuItemRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getAllMenuItemsByOrganizationId(organization_id: number) {
    const query = `
        SELECT
            mi.menu_item_id,
            mi.menu_id,
            mi.base_price,
            mi.description,
            mi.name

          FROM "fm"."menuitems" mi
          JOIN "fm"."menus" m ON m.menu_id = mi.menu_id
          JOIN "fm"."organizations" o ON o.organization_id = m.organization_id
          WHERE o.organization_id = $1`

    const params = [organization_id]

    try {
      const result = await db.query(query, params)

      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getAllMenuItemsByMenu(menu_id: number) {
    const query = `SELECT * FROM "fm"."menuitems" WHERE menu_id = $1`
    const params = [menu_id]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuItemById(menu_item_id: number) {
    const query = `SELECT * FROM "fm"."menuitems" WHERE menu_item_id = $1`
    const params = [menu_item_id]

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

  async createMenuItem({ menu_id, base_price, menu_header_id, description, name }: CreateItemArgs) {
    try {
      const query = `INSERT INTO "fm"."menuitems" (menu_id, base_price, description, name, menu_header_id)
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`
      const params = [menu_id, base_price, description, name, menu_header_id]
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

  async updateMenuItem({ menu_id, menu_item_id, menu_header_id, base_price, description, name }: UpdateItemArgs) {
    const fields = { menu_id, menu_header_id, base_price, description, name }
    const conditions = { menu_item_id }

    const { query, params } = update(`"fm"."menuitems"`, conditions, fields)

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

  async deleteMenuItem(menu_item_id: number) {
    const query = `DELETE FROM "fm"."menuitems" WHERE menu_item_id = $1`
    const params = [menu_item_id]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu item no longer exists!',
          success: false,
        }
      } else {
        //console.log(`DELETED ITEM WITH ID = ${menu_item_id}`)
        return {
          code: 204,
          message: 'The menu item was deleted',
          success: true,
          menu_item: {
            menu_item_id: menu_item_id,
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
