import db from '../../db/config'
import { update } from '../../helpers'

type CreateMenuHeaderArgs = {
  menu_id: number
  name: string
  sub_header: string
}

type UpdateMenuHeaderArgs = {
  header_id: number
  name: string
  sub_header: string
}

export default class MenuHeaderRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getAllMenuHeadersByMenu(menu_id: number) {
    const query = `SELECT * FROM "fm"."headers" WHERE menu_id = $1`
    const params = [menu_id]

    try {
      const result = await db.query(query, params)

      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuHeaderById(header_id: number) {
    const query = `SELECT * FROM "fm"."headers" WHERE header_id = $1`
    const params = [header_id]

    try {
      const result = await db.query(query, params)

      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async createMenuHeader({ menu_id, name, sub_header }: CreateMenuHeaderArgs) {
    const query = `INSERT INTO "fm"."headers" (menu_id, name, sub_header) VALUES ($1, $2, $3) RETURNING *`
    const params = [menu_id, name, sub_header]

    try {
      const result = await db.query(query, params)
      return {
        code: 201,
        message: 'Menu header created!',
        success: true,
        menu_header: result.rows[0],
      }
    } catch (error) {
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        menu_header: {},
      }
    }
  }

  async updateMenuHeader({ header_id, name, sub_header }: UpdateMenuHeaderArgs) {
    const fields = { name, sub_header }
    const conditions = { header_id }

    const { query, params } = update(`"fm"."headers"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Menu header updated!',
        success: true,
        menu_header: result.rows[0],
      }
    } catch (error) {
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        menu_header: {},
      }
    }
  }

  async deleteMenuHeader(header_id: number) {
    const query = `DELETE FROM "fm"."headers" WHERE header_id = $1`
    const params = [header_id]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu header no longer exists!',
          success: false,
          menu_header: {
            header_id: header_id,
            menu_id: '',
          },
        }
      } else {
        return {
          code: 204,
          message: 'The menu header was deleted',
          success: true,
          menu_header: {
            header_id: header_id,
            menu_id: '',
          },
        }
      }
    } catch (error) {
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        menu_header: {},
      }
    }
  }
}
