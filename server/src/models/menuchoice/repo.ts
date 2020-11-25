import db from '../../db/config'
import { update } from '../../helpers'
import { keysToCamel } from '../../utils'

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
    const query = `SELECT * FROM "fm"."choices" WHERE choice_id = $1`
    const params = [choiceId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  async getAllMenuChoicesByTenant(tenantId: number) {
    const query = `SELECT * FROM "fm"."choices" WHERE tenant_id = $1`
    const params = [tenantId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////
  async createMenuChoice({ tenantId, header, description }: CreateMenuChoiceArgs) {
    const query = `INSERT INTO "fm"."choices" (tenant_id, header, description) VALUES ($1, $2, $3) RETURNING *`
    const params = [tenantId, header, description]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu choice created!',
        success: true,
        menuChoice: keysToCamel(result.rows[0]),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
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
        menuChoice: keysToCamel(result.rows[0]),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async deleteMenuChoice({ choiceId }: { choiceId: number }) {
    const query = `DELETE FROM "fm"."choices" WHERE choice_id = $1`
    const params = [choiceId]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu choice no longer exists!',
          success: false,
        }
      } else {
        return {
          code: 204,
          message: 'The menu choice was deleted',
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

  async connectingMenuChoicesToMenuItem({ choiceIds, itemId }: ChoiceWithItemArgs) {
    const values = choiceIds.map((id) => {
      return `(${itemId}, ${id})`
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
            connect: keysToCamel(result.rows),
          },
        }
      }

      return {
        code: 201,
        message: 'Connected choices to items successfully',
        success: true,
        connection: {
          connect: keysToCamel(result.rows),
        },
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async removingMenuChoicesMenuItemsConnection({ choiceIds, itemId }: ChoiceWithItemArgs) {
    const values = choiceIds.map((id) => {
      return `${id}`
    })

    const query = `DELETE FROM "fm"."choices_to_items" WHERE item_id = ${itemId} AND choice_id IN (${values}) RETURNING *`

    try {
      const result = await db.query(query)

      if (!result.rowCount) {
        return {
          code: 204,
          message: 'Choices to items are already disconnected',
          success: true,
          connection: {
            connect: keysToCamel(result.rows),
          },
        }
      }

      return {
        code: 201,
        message: 'Removed connection of choices to items',
        success: true,
        connection: {
          connect: keysToCamel(result.rows),
        },
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
