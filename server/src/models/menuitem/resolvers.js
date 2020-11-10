const getAllMenuItemsByOrganizationId = async ({ organization_id }, context) => {
  const query = `
      SELECT
          mi.menu_item_id,
          mi.menu_id,
          mi.base_price,
          mi.description,
          mi.name

        FROM "fm"."menuitems" mi
        JOIN "fm"."menus" m ON m.menu_id = mi.menu_id
        JOIN "fm"."organizations" o ON o.organization_id = m.organization_id
        WHERE o.organization_id = $1`

  const params = [organization_id]

  try {
    const result = await context.pool.query(query, params)

    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getAllMenuItemsByMenu = async ({ menu_id }, context) => {
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

const getMenuItemById = async ({ menu_item_id }, context) => {
  const query = `SELECT * FROM "fm"."menuitems" WHERE menu_item_id = $1`
  const params = [menu_item_id]

  try {
    const result = await context.pool.query(query, params)
    //console.log(result)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const createMenuItem = async ({ menu_id, base_price, menu_header_id, description, name }, context) => {
  const query = `INSERT INTO "fm"."menuitems" (menu_id, base_price, description, name, menu_header_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
  const params = [menu_id, base_price, description, name, menu_header_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const updateMenuItem = async ({ menu_id, menu_item_id, menu_header_id, base_price, description, name }, context) => {
  const query = `UPDATE "fm"."menuitems" SET name = $1, base_price = $2, description = $3, menu_id = $4, menu_header_id = $5 WHERE menu_item_id = $6 RETURNING *`
  const params = [name, base_price, description, menu_id, menu_header_id, menu_item_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const deleteMenuItem = async ({ menu_item_id }, context) => {
  const query = `DELETE FROM "fm"."menuitems" WHERE menu_item_id = $1`
  const params = [menu_item_id]

  try {
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('A Menu with that ID does not exist!')
    } else {
      //console.log(`DELETED ITEM WITH ID = ${menu_item_id}`)
      return {
        menu_item_id: menu_item_id,
      }
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = {
  getAllMenuItemsByOrganizationId,
  getMenuItemById,
  createMenuItem,
  deleteMenuItem,
  getAllMenuItemsByMenu,
  updateMenuItem,
}
