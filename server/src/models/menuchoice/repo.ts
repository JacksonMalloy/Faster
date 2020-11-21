import db from '../../db/config'
import { update } from '../../helpers'

type CreateMenuChoiceArgs = {
  header: string
  sub_header: string
  tenant_id: number
}

type UpdateMenuChoiceArgs = {
  header: string
  sub_header: string
  choice_id: number
}

type ChoiceWithItemArgs = {
  item_id: number
  choice_ids: number[]
}

export default class MenuChoiceRepository {
  ////////////////////
  ///////READS////////
  ////////////////////
  async getMenuChoiceById(choice_id: number) {
    const query = `SELECT * FROM "fm"."choices" WHERE choice_id = $1`
    const params = [choice_id]

    try {
      const result = await db.query(query, params)
      //console.log(result.rows[0])
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getAllMenuChoicesByTenant(tenant_id: number) {
    const query = `SELECT * FROM "fm"."choices" WHERE tenant_id = $1`
    const params = [tenant_id]

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
  async createMenuChoice({ tenant_id, header, sub_header }: CreateMenuChoiceArgs) {
    const query = `INSERT INTO "fm"."choices" (tenant_id, header, sub_header) VALUES ($1, $2, $3) RETURNING *`
    const params = [tenant_id, header, sub_header]

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

  async updateMenuChoice({ choice_id, header, sub_header }: UpdateMenuChoiceArgs) {
    const fields = { header, sub_header }
    const conditions = { choice_id }

    const { query, params } = update(`"fm"."choices"`, conditions, fields)

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

  async deleteMenuChoice({ choice_id }: { choice_id: number }) {
    const query = `DELETE FROM "fm"."choices" WHERE choice_id = $1`
    const params = [choice_id]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu choice no longer exists!',
          success: false,
          menu_choice: {
            choice_id: choice_id,
            tenant_id: '',
          },
        }
      } else {
        return {
          code: 204,
          message: 'The menu choice was deleted',
          success: true,
          menu_choice: {
            choice_id: choice_id,
            tenant_id: '',
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

  async connectingMenuChoicesToMenuItem({ choice_ids, item_id }: ChoiceWithItemArgs) {
    const values = choice_ids.map((id) => {
      return `(${item_id}, ${id})`
    })

    const query = `INSERT INTO "fm"."choices_to_items" (item_id, choice_id) VALUES ${values} ON CONFLICT DO NOTHING RETURNING *`

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

  async removingMenuChoicesMenuItemsConnection({ choice_ids, item_id }: ChoiceWithItemArgs) {
    const values = choice_ids.map((id) => {
      return `${id}`
    })

    const query = `DELETE FROM "fm"."choices_to_items" WHERE item_id = ${item_id} AND choice_id IN (${values}) RETURNING *`

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
