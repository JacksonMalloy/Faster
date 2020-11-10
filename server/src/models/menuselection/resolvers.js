const getMenuSelectionById = async ({ menu_selection_id }, context) => {
  const query = `SELECT * FROM "fm"."menuselections" WHERE menu_selection_id = $1`
  const params = [menu_selection_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getMenuSelectionsByMenuItem = async ({ menu_item_id }, context) => {
  const query = `SELECT * FROM "fm"."menuselections" WHERE menu_item_id = $1`
  const params = [menu_item_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getMenuSelectionsByMenuChoice = async ({ menu_choice_id }, context) => {
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
    const result = await context.pool.query(query, params)
    //console.log(result.rows[0])
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getMenuSelectionsByOrganization = async ({ organization_id }, context) => {
  const query = `SELECT * FROM "fm"."menuselections" WHERE organization_id = $1`
  const params = [organization_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

//////////////////////////
///////MUTATIONS//////////
//////////////////////////

const createMenuSelection = async ({ organization_id, menu_item_id, name, value_add }, context) => {
  const query = `INSERT INTO "fm"."menuselections" (organization_id, menu_item_id, name, value_add) VALUES ($1, $2, $3, $4) RETURNING *`
  const params = [organization_id, menu_item_id, name, value_add]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const updateMenuSelection = async ({ menu_selection_id, name, value_add }, context) => {
  const query = `UPDATE "fm"."menuselections" SET name = $1, value_add = $2 WHERE menu_selection_id = $3 RETURNING *`
  const params = [name, value_add, menu_selection_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const deleteMenuSelection = async ({ menu_selection_id }, context) => {
  const query = `DELETE FROM "fm"."menuselections" WHERE menu_selection_id = $1`
  const params = [menu_selection_id]

  try {
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('A Menu Selection with that ID does not exist!')
    } else {
      //console.log(`DELETED MENU SELECTION WITH ID = ${menu_selection_id}`)
      return {
        menu_selection_id: menu_selection_id,
      }
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const connectingMenuSelectionToMenuChoice = async ({ menu_choice_id, menu_selection_ids }, context) => {
  const values = menu_selection_ids.map((id) => {
    return `(${menu_choice_id}, ${id})`
  })

  const query = `INSERT INTO "fm"."menuselections_to_menuchoices" (menu_choice_id, menu_selection_id) VALUES ${values} ON CONFLICT DO NOTHING RETURNING * `

  try {
    const result = await context.pool.query(query)
    //console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const removingMenuSelectionsMenuChoicesConnection = async ({ menu_choice_id, menu_selection_ids }, context) => {
  const values = menu_selection_ids.map((id) => {
    return `${id}`
  })

  const query = `DELETE FROM "fm"."menuselections_to_menuchoices" WHERE menu_choice_id = ${menu_choice_id} AND menu_selection_id IN (${values}) RETURNING *`

  try {
    const result = await context.pool.query(query)
    //console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = {
  getMenuSelectionById,
  getMenuSelectionsByMenuItem,
  getMenuSelectionsByMenuChoice,
  getMenuSelectionsByOrganization,
  createMenuSelection,
  deleteMenuSelection,
  updateMenuSelection,
  connectingMenuSelectionToMenuChoice,
  removingMenuSelectionsMenuChoicesConnection,
}
