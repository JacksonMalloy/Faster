import db from '../../db/config'
import { update } from '../../helpers'

type CreateSelectionArgs = {
  organization_id: number
  menu_item_id: number
  name: string
  value_add: string
}

type UpdateSelectionArgs = {
  organization_id: number
  menu_selection_id: number
  menu_item_id: number
  name: string
  value_add: string
}

type SelectionsWithChoice = {
  menu_selection_ids: number[]
  menu_choice_id: number
}

export default class MenuSelectionRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getMenuSelectionById(menu_selection_id: number) {
    const query = `SELECT * FROM "fm"."menuselections" WHERE menu_selection_id = $1`
    const params = [menu_selection_id]

    try {
      const result = await db.query(query, params)
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuSelectionsByMenuItem(menu_item_id: number) {
    const query = `SELECT * FROM "fm"."menuselections" WHERE menu_item_id = $1`
    const params = [menu_item_id]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuSelectionsByMenuChoice(menu_choice_id: number) {
    const query = `SELECT
                    *
                  FROM
                    "fm"."menuselections" s
                  INNER JOIN
                    "fm"."menuselections_to_menuchoices" mc
                  ON mc.menu_selection_id = s.menu_selection_id
                  INNER JOIN
                    "fm"."menuchoices" c
                    ON c.menu_choice_id = mc.menu_choice_id
                  WHERE c.menu_choice_id = $1`

    const params = [menu_choice_id]

    try {
      const result = await db.query(query, params)
      //console.log(result.rows[0])
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getMenuSelectionsByOrganization(organization_id: number) {
    const query = `SELECT * FROM "fm"."menuselections" WHERE organization_id = $1`
    const params = [organization_id]

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

  async createMenuSelection({ organization_id, menu_item_id, name, value_add }: CreateSelectionArgs) {
    const query = `INSERT INTO "fm"."menuselections" (organization_id, menu_item_id, name, value_add) VALUES ($1, $2, $3, $4) RETURNING *`
    const params = [organization_id, menu_item_id, name, value_add]

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

  async updateMenuSelection({ menu_selection_id, name, value_add }: UpdateSelectionArgs) {
    const fields = { value_add, name }
    const conditions = { menu_selection_id }

    const { query, params } = update(`"fm"."menuselections"`, conditions, fields)

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

  async deleteMenuSelection(menu_selection_id: number) {
    const query = `DELETE FROM "fm"."menuselections" WHERE menu_selection_id = $1`
    const params = [menu_selection_id]

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
            menu_selection_id: menu_selection_id,
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

  async connectingMenuSelectionToMenuChoice({ menu_choice_id, menu_selection_ids }: SelectionsWithChoice) {
    const values = menu_selection_ids.map((id) => {
      return `(${menu_choice_id}, ${id})`
    })

    const query = `INSERT INTO "fm"."menuselections_to_menuchoices" (menu_choice_id, menu_selection_id) VALUES ${values} ON CONFLICT DO NOTHING RETURNING * `

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

  async removingMenuSelectionsMenuChoicesConnection({ menu_choice_id, menu_selection_ids }: SelectionsWithChoice) {
    const values = menu_selection_ids.map((id) => {
      return `${id}`
    })

    const query = `DELETE FROM "fm"."menuselections_to_menuchoices" WHERE menu_choice_id = ${menu_choice_id} AND menu_selection_id IN (${values}) RETURNING *`

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
