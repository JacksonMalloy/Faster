const getAllMenusByOrganization = async ({ organization_id }, context) => {
  const query = `SELECT * FROM "fm"."menus" WHERE organization_id = $1`
  const params = [organization_id]

  try {
    const result = await context.pool.query(query, params)

    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getMenuById = async ({ menu_id }, context) => {
  const query = `SELECT * FROM "fm"."menus" WHERE menu_id = $1`
  const params = [menu_id]

  const getMenuItems = async (menu_id) => {
    const query = `SELECT * FROM "fm"."menuitems" WHERE menu_id = $1`
    const params = [menu_id]

    try {
      const result = await context.pool.query(query, params)

      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  try {
    const result = await context.pool.query(query, params)
    const menu_id = result.rows[0].menu_id
    const menu_items = await getMenuItems(menu_id)

    return Object.assign(result.rows[0], { menu_items })
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const createMenu = async ({ organization_id, title }, context) => {
  const query = `INSERT INTO "fm"."menus" (organization_id, title) VALUES ($1, $2) RETURNING *`
  const params = [organization_id, title]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const updateMenu = async ({ menu_id, title }, context) => {
  const query = `UPDATE "fm"."menus" SET title = $1 WHERE menu_id = $2 RETURNING *`
  const params = [title, menu_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const deleteMenu = async ({ menu_id }, context) => {
  const query = `DELETE FROM "fm"."menus" WHERE menu_id = $1`
  const params = [menu_id]

  const resetImageId = async (menu_id) => {
    const query = `UPDATE "fm"."images" SET menu_id = null WHERE menu_id = $1 RETURNING *`
    const params = [menu_id]

    try {
      const result = await context.pool.query(query, params)

      //console.log(result.rows)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  try {
    const updatedMenuId = await resetImageId(menu_id)

    //console.log({ updatedMenuId })
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('A Menu with that ID does not exist!')
    } else {
      //console.log(`DELETED MENU WITH ID = ${menu_id}`)
      return {
        menu_id: menu_id,
      }
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = { getMenuById, createMenu, deleteMenu, getAllMenusByOrganization, updateMenu }
