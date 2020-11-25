import db from '../../db/config'
import { update } from '../../helpers'

type CreateSelectionArgs = {
  tenantId: number
  itemId: number
  name: string
  valueAdd: string
}

type UpdateSelectionArgs = {
  tenantId: number
  selectionId: number
  itemId: number
  name: string
  valueAdd: string
}

type SelectionsWithChoice = {
  selectionIds: number[]
  choiceId: number
}

export default class MenuSelectionRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getMenuSelectionById(selectionId: number) {
    const query = `SELECT * FROM "fm"."selections" WHERE selectionId = $1`
    const params = [selectionId]

    try {
      const result = await db.query(query, params)
      return result.rows[0]
    } catch (error) {
       throw error
    }
  }

  async getMenuSelectionsByMenuItem(itemId: number) {
    const query = `SELECT * FROM "fm"."selections" WHERE itemId = $1`
    const params = [itemId]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
       throw error
    }
  }

  async getMenuSelectionsByMenuChoice(choiceId: number) {
    const query = `SELECT
                    *
                  FROM
                    "fm"."selections" s
                  INNER JOIN
                    "fm"."selections_to_choices" mc
                  ON mc.selectionId = s.selectionId
                  INNER JOIN
                    "fm"."choices" c
                    ON c.choiceId = mc.choiceId
                  WHERE c.choiceId = $1`

    const params = [choiceId]

    try {
      const result = await db.query(query, params)
      //console.log(result.rows[0])
      return result.rows
    } catch (error) {
       throw error
    }
  }

  async getMenuSelectionsByTenant(tenantId: number) {
    const query = `SELECT * FROM "fm"."selections" WHERE tenantId = $1`
    const params = [tenantId]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
       throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async createMenuSelection({ tenantId, itemId, name, valueAdd }: CreateSelectionArgs) {
    const query = `INSERT INTO "fm"."selections" (tenantId, itemId, name, valueAdd) VALUES ($1, $2, $3, $4) RETURNING *`
    const params = [tenantId, itemId, name, valueAdd]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu selection created!',
        success: true,
        menuSelection: result.rows[0],
      }
    } catch (error) {
       return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async updateMenuSelection({ selectionId, name, valueAdd }: UpdateSelectionArgs) {
    const fields = { valueAdd, name }
    const conditions = { selectionId }

    const { query, params } = update(`"fm"."selections"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Menu selecction updated!',
        success: true,
        menuSelection: result.rows[0],
      }
    } catch (error) {
       return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async deleteMenuSelection(selectionId: number) {
    const query = `DELETE FROM "fm"."selections" WHERE selectionId = $1`
    const params = [selectionId]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The menu selection no longer exists!',
          success: false,
        }
      } else {
        return {
          code: 204,
          message: 'The menu selection was deleted',
          success: true,
          menuSelection: {
            selectionId: selectionId,
          },
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

  async connectingMenuSelectionToMenuChoice({ choiceId, selectionIds }: SelectionsWithChoice) {
    const values = selectionIds.map((id) => {
      return `(${choiceId}, ${id})`
    })

    const query = `INSERT INTO "fm"."selections_to_choices" (choiceId, selectionId) VALUES ${values} ON CONFLICT DO NOTHING RETURNING * `

    try {
      const result = await db.query(query)

      if (!result.rowCount) {
        return {
          code: 204,
          message: 'Selections to choices are already connected',
          success: true,
          connection: {
            connect: result.rows,
          },
        }
      }

      return {
        code: 201,
        message: 'Connected selections to choices successfully',
        success: true,
        connection: {
          connect: result.rows,
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

  async removingMenuSelectionsMenuChoicesConnection({ choiceId, selectionIds }: SelectionsWithChoice) {
    const values = selectionIds.map((id) => {
      return `${id}`
    })

    const query = `DELETE FROM "fm"."selections_to_choices" WHERE choiceId = ${choiceId} AND selectionId IN (${values}) RETURNING *`

    try {
      const result = await db.query(query)

      if (!result.rowCount) {
        return {
          code: 204,
          message: 'Selections to choices are already disconnected',
          success: true,
          connection: {
            connect: result.rows,
          },
        }
      }

      return {
        code: 201,
        message: 'Removed connection of selections to choices',
        success: true,
        connection: {
          connect: result.rows,
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
