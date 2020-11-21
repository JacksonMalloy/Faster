import db from '../../db/config'
import { update } from '../../helpers'

type CreateSelectionArgs = {
  tenant_id: number
  item_id: number
  name: string
  value_add: string
}

type UpdateSelectionArgs = {
  tenant_id: number
  selection_id: number
  item_id: number
  name: string
  value_add: string
}

type SelectionsWithChoice = {
  selection_ids: number[]
  choice_id: number
}

export default class MenuSelectionRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getMenuSelectionById(selection_id: number) {
    const query = `SELECT * FROM "fm"."selections" WHERE selection_id = $1`
    const params = [selection_id]

    try {
      const result = await db.query(query, params)
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuSelectionsByMenuItem(item_id: number) {
    const query = `SELECT * FROM "fm"."selections" WHERE item_id = $1`
    const params = [item_id]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuSelectionsByMenuChoice(choice_id: number) {
    const query = `SELECT
                    *
                  FROM
                    "fm"."selections" s
                  INNER JOIN
                    "fm"."selections_to_choices" mc
                  ON mc.selection_id = s.selection_id
                  INNER JOIN
                    "fm"."choices" c
                    ON c.choice_id = mc.choice_id
                  WHERE c.choice_id = $1`

    const params = [choice_id]

    try {
      const result = await db.query(query, params)
      //console.log(result.rows[0])
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuSelectionsByTenant(tenant_id: number) {
    const query = `SELECT * FROM "fm"."selections" WHERE tenant_id = $1`
    const params = [tenant_id]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async createMenuSelection({ tenant_id, item_id, name, value_add }: CreateSelectionArgs) {
    const query = `INSERT INTO "fm"."selections" (tenant_id, item_id, name, value_add) VALUES ($1, $2, $3, $4) RETURNING *`
    const params = [tenant_id, item_id, name, value_add]

    try {
      const result = await db.query(query, params)

      return {
        code: 201,
        message: 'Menu selection created!',
        success: true,
        menu_selection: result.rows[0],
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

  async updateMenuSelection({ selection_id, name, value_add }: UpdateSelectionArgs) {
    const fields = { value_add, name }
    const conditions = { selection_id }

    const { query, params } = update(`"fm"."selections"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Menu selecction updated!',
        success: true,
        menu_selection: result.rows[0],
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

  async deleteMenuSelection(selection_id: number) {
    const query = `DELETE FROM "fm"."selections" WHERE selection_id = $1`
    const params = [selection_id]

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
          menu_selection: {
            selection_id: selection_id,
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

  async connectingMenuSelectionToMenuChoice({ choice_id, selection_ids }: SelectionsWithChoice) {
    const values = selection_ids.map((id) => {
      return `(${choice_id}, ${id})`
    })

    const query = `INSERT INTO "fm"."selections_to_choices" (choice_id, selection_id) VALUES ${values} ON CONFLICT DO NOTHING RETURNING * `

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
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
      }
    }
  }

  async removingMenuSelectionsMenuChoicesConnection({ choice_id, selection_ids }: SelectionsWithChoice) {
    const values = selection_ids.map((id) => {
      return `${id}`
    })

    const query = `DELETE FROM "fm"."selections_to_choices" WHERE choice_id = ${choice_id} AND selection_id IN (${values}) RETURNING *`

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
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
      }
    }
  }
}
