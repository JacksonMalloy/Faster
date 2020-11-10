const getMenuChoiceById = async ({ menu_choice_id }, context) => {
  const query = `SELECT * FROM "fm"."menuchoices" WHERE menu_choice_id = $1`
  const params = [menu_choice_id]

  try {
    const result = await context.pool.query(query, params)
    //console.log(result.rows[0])
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getAllMenuChoicesByOrganization = async ({ organization_id }, context) => {
  const query = `SELECT * FROM "fm"."menuchoices" WHERE organization_id = $1`
  const params = [organization_id]

  try {
    const result = await context.pool.query(query, params)
    //console.log(result.rows)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

////////////////////
/////MUTATIONS//////
////////////////////

const createMenuChoice = async ({ organization_id, header, sub_header }, context) => {
  const query = `INSERT INTO "fm"."menuchoices" (organization_id, header, sub_header) VALUES ($1, $2, $3) RETURNING *`
  const params = [organization_id, header, sub_header]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const updateMenuChoice = async ({ menu_choice_id, header, sub_header }, context) => {
  const query = `UPDATE "fm"."menuchoices" SET header = $1, sub_header = $2 WHERE menu_choice_id = $3 RETURNING *`
  const params = [header, sub_header, menu_choice_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const deleteMenuChoice = async ({ menu_choice_id }, context) => {
  const query = `DELETE FROM "fm"."menuchoices" WHERE menu_choice_id = $1`
  const params = [menu_choice_id]

  try {
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('A Menu with that ID does not exist!')
    } else {
      //console.log(`DELETED ITEM WITH ID = ${menu_choice_id}`)
      return {
        menu_choice_id: menu_choice_id,
      }
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const connectingMenuChoiceToMenuItem = async ({ menu_choice_ids, menu_item_id }, context) => {
  const values = menu_choice_ids.map((id) => {
    return `(${menu_item_id}, ${id})`
  })

  const query = `INSERT INTO "fm"."menuchoices_to_menuitems" (menu_item_id, menu_choice_id) VALUES ${values} RETURNING *`

  try {
    const result = await context.pool.query(query)
    //console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const removingMenuChoicesMenuItemsConnection = async ({ menu_choice_ids, menu_item_id }, context) => {
  const values = menu_choice_ids.map((id) => {
    return `${id}`
  })

  const query = `DELETE FROM "fm"."menuchoices_to_menuitems" WHERE menu_item_id = ${menu_item_id} AND menu_choice_id IN (${values}) RETURNING *`

  try {
    const result = await context.pool.query(query)
    //console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

removingMenuChoicesMenuItemsConnection

module.exports = {
  getMenuChoiceById,
  createMenuChoice,
  deleteMenuChoice,
  getAllMenuChoicesByOrganization,
  connectingMenuChoiceToMenuItem,
  updateMenuChoice,
  removingMenuChoicesMenuItemsConnection,
}
