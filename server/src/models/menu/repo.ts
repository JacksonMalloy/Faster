import db from '../../db/config'
import { update } from '../../helpers'

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
    const query = `SELECT * FROM "fm"."menus" WHERE tenantId = $1`
    const params = [tenantId]

    try {
      const result = await db.query(query, params)

      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuById(menuId: number) {
    const query = `SELECT * FROM "fm"."menus" WHERE menuId = $1`
    const params = [menuId]

    try {
      const result = await db.query(query, params)

      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async createMenu({ tenantId, title }: CreateMenuArgs) {
    const query = `INSERT INTO "fm"."menus" (tenantId, title) VALUES ($1, $2) RETURNING *`
    const params = [tenantId, title]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu created!',
        success: true,
        menu: result.rows[0],
      }
    } catch (error) {
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        customer: {},
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
        menu: result.rows[0],
      }
    } catch (error) {
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        customer: {},
      }
    }
  }

  async deleteMenu({ menuId }: { menuId: number }) {
    const query = `DELETE FROM "fm"."menus" WHERE menuId = $1`
    const params = [menuId]

    const resetImageId = async (menuId: number) => {
      const query = `UPDATE "fm"."images" SET menuId = null WHERE menuId = $1 RETURNING *`
      const params = [menuId]

      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
        console.log(error)
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
          menu: {
            menuId: menuId,
            tenantId: '',
          },
        }
      } else {
        return {
          code: 204,
          message: 'The menu was deleted',
          success: true,
          menu: {
            menuId: menuId,
            tenantId: '',
          },
        }
      }
    } catch (error) {
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        customer: {},
      }
    }
  }
}
