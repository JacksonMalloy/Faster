import db from '../../db/config'
import { update } from '../../helpers'
import { keysToCamel } from '../../utils'

type CreateMenuArgs = {
  tenantId: number
  title: string
}

type UpdateMenuArgs = {
  menuId: number
  title: number
  published: boolean
}

export default class MenuRepository {
  async getAllMenusByTenant(tenantId: number) {
    const query = `SELECT * FROM "fm"."menus" WHERE tenant_id = $1`
    const params = [tenantId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  async getMenuById(menuId: number) {
    const query = `SELECT * FROM "fm"."menus" WHERE menu_id = $1`
    const params = [menuId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  async createMenu({ tenantId, title }: CreateMenuArgs) {
    const query = `INSERT INTO "fm"."menus" (tenant_id, title) VALUES ($1, $2) RETURNING *`
    const params = [tenantId, title]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu created!',
        success: true,
        menu: keysToCamel(result.rows[0]),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async updateMenu({ menuId, title, published }: UpdateMenuArgs) {
    const fields = { title, published }
    const conditions = { menuId }

    const { query, params } = update(`"fm"."menus"`, conditions, fields)

    try {
      const result = await db.query(query, params)
      return {
        code: 200,
        message: 'Menu updated!',
        success: true,
        menu: keysToCamel(result.rows[0]),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async deleteMenu({ menuId }: { menuId: number }) {
    const query = `DELETE FROM "fm"."menus" WHERE menu_id = $1`
    const params = [menuId]

    const resetImageId = async (menuId: number) => {
      const query = `UPDATE "fm"."images" SET menu_id = null WHERE menu_id = $1 RETURNING *`
      const params = [menuId]

      try {
        const result = await db.query(query, params)

        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    }

    try {
      await resetImageId(menuId)

      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu no longer exists!',
          success: false,
        }
      } else {
        return {
          code: 204,
          message: 'The menu was deleted',
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
