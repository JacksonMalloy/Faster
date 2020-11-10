import db from '../../db/config'
import { update } from '../../helpers'

type CreateMenuChoiceArgs = {
  header: string
  sub_header: string
  organization_id: number
}

type UpdateMenuChoiceArgs = {
  header: string
  sub_header: string
  menu_choice_id: number
}

type ChoiceWithItemArgs = {
  menu_item_id: number
  menu_choice_ids: number[]
}

export default class MenuChoiceRepository {
  ////////////////////
  ///////READS////////
  ////////////////////
  async getMenuChoiceById(menu_choice_id: number) {
    const query = `SELECT * FROM "fm"."menuchoices" WHERE menu_choice_id = $1`
    const params = [menu_choice_id]

    try {
      const result = await db.query(query, params)
      //console.log(result.rows[0])
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getAllMenuChoicesByOrganization(organization_id: number) {
    const query = `SELECT * FROM "fm"."menuchoices" WHERE organization_id = $1`
    const params = [organization_id]

    try {
      const result = await db.query(query, params)
      //console.log(result.rows)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////
  async createMenuChoice({ organization_id, header, sub_header }: CreateMenuChoiceArgs) {
    const query = `INSERT INTO "fm"."menuchoices" (organization_id, header, sub_header) VALUES ($1, $2, $3) RETURNING *`
    const params = [organization_id, header, sub_header]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu choice created!',
        success: true,
        menu_choice: result.rows[0],
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

  async updateMenuChoice({ menu_choice_id, header, sub_header }: UpdateMenuChoiceArgs) {
    const fields = { header, sub_header }
    const conditions = { menu_choice_id }

    const { query, params } = update(`"fm"."menuchoices"`, conditions, fields)

    try {
      const result = await db.query(query, params)
      return {
        code: 200,
        message: 'Menu choice updated!',
        success: true,
        menu_choice: result.rows[0],
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

  async deleteMenuChoice({ menu_choice_id }: { menu_choice_id: number }) {
    const query = `DELETE FROM "fm"."menuchoices" WHERE menu_choice_id = $1`
    const params = [menu_choice_id]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu choice no longer exists!',
          success: false,
          menu_choice: {
            menu_choice_id: menu_choice_id,
            organization_id: '',
          },
        }
      } else {
        return {
          code: 204,
          message: 'The menu choice was deleted',
          success: true,
          menu_choice: {
            menu_choice_id: menu_choice_id,
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
      }
    }
  }

  async connectingMenuChoicesToMenuItem({ menu_choice_ids, menu_item_id }: ChoiceWithItemArgs) {
    const values = menu_choice_ids.map((id) => {
      return `(${menu_item_id}, ${id})`
    })

    const query = `INSERT INTO "fm"."menuchoices_to_menuitems" (menu_item_id, menu_choice_id) VALUES ${values} ON CONFLICT DO NOTHING RETURNING *`

    try {
      const result = await db.query(query)

      if (!result.rowCount) {
        return {
          code: 204,
          message: 'Choices to items are already connected',
          success: true,
          connection: {
            connect: result.rows,
          },
        }
      }

      return {
        code: 201,
        message: 'Connected choices to items successfully',
        success: true,
        connection: {
          connect: result.rows,
        },
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

  async removingMenuChoicesMenuItemsConnection({ menu_choice_ids, menu_item_id }: ChoiceWithItemArgs) {
    const values = menu_choice_ids.map((id) => {
      return `${id}`
    })

    const query = `DELETE FROM "fm"."menuchoices_to_menuitems" WHERE menu_item_id = ${menu_item_id} AND menu_choice_id IN (${values}) RETURNING *`

    try {
      const result = await db.query(query)

      if (!result.rowCount) {
        return {
          code: 204,
          message: 'Choices to items are already disconnected',
          success: true,
          connection: {
            connect: result.rows,
          },
        }
      }

      return {
        code: 201,
        message: 'Removed connection of choices to items',
        success: true,
        connection: {
          connect: result.rows,
        },
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
