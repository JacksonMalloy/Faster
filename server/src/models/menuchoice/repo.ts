import db from '../../db/config'
import { update } from '../../helpers'

type CreateMenuChoiceArgs = {
  header: string
  description: string
  tenantId: number
}

type UpdateMenuChoiceArgs = {
  header: string
  description: string
  choiceId: number
}

type ChoiceWithItemArgs = {
  itemId: number
  choiceIds: number[]
}

export default class MenuChoiceRepository {
  ////////////////////
  ///////READS////////
  ////////////////////
  async getMenuChoiceById(choiceId: number) {
    const query = `SELECT * FROM "fm"."choices" WHERE choiceId = $1`
    const params = [choiceId]

    try {
      const result = await db.query(query, params)
      //console.log(result.rows[0])
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getAllMenuChoicesByTenant(tenantId: number) {
    const query = `SELECT * FROM "fm"."choices" WHERE tenantId = $1`
    const params = [tenantId]

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
  async createMenuChoice({ tenantId, header, description }: CreateMenuChoiceArgs) {
    const query = `INSERT INTO "fm"."choices" (tenantId, header, description) VALUES ($1, $2, $3) RETURNING *`
    const params = [tenantId, header, description]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu choice created!',
        success: true,
        menuChoice: result.rows[0],
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

  async updateMenuChoice({ choiceId, header, description }: UpdateMenuChoiceArgs) {
    const fields = { header, description }
    const conditions = { choiceId }

    const { query, params } = update(`"fm"."choices"`, conditions, fields)

    try {
      const result = await db.query(query, params)
      return {
        code: 200,
        message: 'Menu choice updated!',
        success: true,
        menuChoice: result.rows[0],
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

  async deleteMenuChoice({ choiceId }: { choiceId: number }) {
    const query = `DELETE FROM "fm"."choices" WHERE choiceId = $1`
    const params = [choiceId]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu choice no longer exists!',
          success: false,
          menuChoice: {
            choiceId: choiceId,
            tenantId: '',
          },
        }
      } else {
        return {
          code: 204,
          message: 'The menu choice was deleted',
          success: true,
          menuChoice: {
            choiceId: choiceId,
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
      }
    }
  }

  async connectingMenuChoicesToMenuItem({ choiceIds, itemId }: ChoiceWithItemArgs) {
    const values = choiceIds.map((id) => {
      return `(${itemId}, ${id})`
    })

    const query = `INSERT INTO "fm"."choices_to_items" (itemId, choiceId) VALUES ${values} ON CONFLICT DO NOTHING RETURNING *`

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

  async removingMenuChoicesMenuItemsConnection({ choiceIds, itemId }: ChoiceWithItemArgs) {
    const values = choiceIds.map((id) => {
      return `${id}`
    })

    const query = `DELETE FROM "fm"."choices_to_items" WHERE itemId = ${itemId} AND choiceId IN (${values}) RETURNING *`

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
