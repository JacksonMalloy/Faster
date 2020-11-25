import db from '../../db/config'
import { update } from '../../helpers'

type CreateMenuHeaderArgs = {
  menuId: number
  name: string
  description: string
}

type UpdateMenuHeaderArgs = {
  headerId: number
  name: string
  description: string
}

export default class MenuHeaderRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getAllMenuHeadersByMenu(menuId: number) {
    const query = `SELECT * FROM "fm"."headers" WHERE menuId = $1`
    const params = [menuId]

    try {
      const result = await db.query(query, params)

      return result.rows
    } catch (error) {
       throw error
    }
  }

  async getMenuHeaderById(headerId: number) {
    const query = `SELECT * FROM "fm"."headers" WHERE headerId = $1`
    const params = [headerId]

    try {
      const result = await db.query(query, params)

      return result.rows[0]
    } catch (error) {
       throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async createMenuHeader({ menuId, name, description }: CreateMenuHeaderArgs) {
    const query = `INSERT INTO "fm"."headers" (menuId, name, description) VALUES ($1, $2, $3) RETURNING *`
    const params = [menuId, name, description]

    try {
      const result = await db.query(query, params)
      return {
        code: 201,
        message: 'Menu header created!',
        success: true,
        menuHeader: result.rows[0],
      }
    } catch (error) {
       return {
        code: 503,
        message: error,
        success: false,
        menuHeader: {},
      }
    }
  }

  async updateMenuHeader({ headerId, name, description }: UpdateMenuHeaderArgs) {
    const fields = { name, description }
    const conditions = { headerId }

    const { query, params } = update(`"fm"."headers"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Menu header updated!',
        success: true,
        menuHeader: result.rows[0],
      }
    } catch (error) {
       return {
        code: 503,
        message: error,
        success: false,
        menuHeader: {},
      }
    }
  }

  async deleteMenuHeader(headerId: number) {
    const query = `DELETE FROM "fm"."headers" WHERE headerId = $1`
    const params = [headerId]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu header no longer exists!',
          success: false,
          menuHeader: {
            headerId: headerId,
            menuId: '',
          },
        }
      } else {
        return {
          code: 204,
          message: 'The menu header was deleted',
          success: true,
          menuHeader: {
            headerId: headerId,
            menuId: '',
          },
        }
      }
    } catch (error) {
       return {
        code: 503,
        message: error,
        success: false,
        menuHeader: {},
      }
    }
  }
}
