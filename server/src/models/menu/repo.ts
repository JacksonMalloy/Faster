import db from '../../db/config'
import { update } from '../../helpers'

type CreateMenuArgs = {
  organization_id: number
  title: string
}

type UpdateMenuArgs = {
  menu_id: number
  title: number
  published: boolean
}

export default class MenuRepository {
  async getAllMenusByOrganization(organization_id: number) {
    const query = `SELECT * FROM "fm"."menus" WHERE organization_id = $1`
    const params = [organization_id]

    try {
      const result = await db.query(query, params)

      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuById(menu_id: number) {
    const query = `SELECT * FROM "fm"."menus" WHERE menu_id = $1`
    const params = [menu_id]

    try {
      const result = await db.query(query, params)

      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async createMenu({ organization_id, title }: CreateMenuArgs) {
    const query = `INSERT INTO "fm"."menus" (organization_id, title) VALUES ($1, $2) RETURNING *`
    const params = [organization_id, title]

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

  async updateMenu({ menu_id, title, published }: UpdateMenuArgs) {
    const fields = { title, published }
    const conditions = { menu_id }

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

  async deleteMenu({ menu_id }: { menu_id: number }) {
    const query = `DELETE FROM "fm"."menus" WHERE menu_id = $1`
    const params = [menu_id]

    const resetImageId = async (menu_id: number) => {
      const query = `UPDATE "fm"."images" SET menu_id = null WHERE menu_id = $1 RETURNING *`
      const params = [menu_id]

      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    try {
      await resetImageId(menu_id)

      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu no longer exists!',
          success: false,
          menu: {
            menu_id: menu_id,
            organization_id: '',
          },
        }
      } else {
        return {
          code: 204,
          message: 'The menu was deleted',
          success: true,
          menu: {
            menu_id: menu_id,
            organization_id: '',
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
