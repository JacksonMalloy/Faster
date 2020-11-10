const getAllMenuHeadersByMenu = async ({ menu_id }, context) => {
  const query = `SELECT * FROM "fm"."menuheaders" WHERE menu_id = $1`
  const params = [menu_id]

  try {
    const result = await context.pool.query(query, params)

    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getMenuHeaderById = async ({ menu_header_id }, context) => {
  const query = `SELECT * FROM "fm"."menuheaders" WHERE menu_header_id = $1`
  const params = [menu_header_id]

  try {
    const result = await context.pool.query(query, params)

    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const createMenuHeader = async ({ menu_id, name, sub_header }, context) => {
  const query = `INSERT INTO "fm"."menuheaders" (menu_id, name, sub_header) VALUES ($1, $2, $3) RETURNING *`
  const params = [menu_id, name, sub_header]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const updateMenuHeader = async ({ menu_header_id, name, sub_header }, context) => {
  const suppliedParams = { name, sub_header, menu_header_id }

  const conditions = []
  const params = []
  let keys = Object.keys(suppliedParams)
  let i = 1

  for (const key of keys) {
    if (suppliedParams[key] !== undefined) {
      conditions.push(key + '=$' + [i])
      params.push(suppliedParams[key])
      i++
    }
  }

  const query = `UPDATE "fm"."menuheaders" SET ${conditions.join(
    ', '
  )} WHERE menu_header_id = ${menu_header_id} RETURNING *`

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const deleteMenuHeader = async ({ menu_header_id }, context) => {
  const query = `DELETE FROM "fm"."menuheaders" WHERE menu_header_id = $1`
  const params = [menu_header_id]

  try {
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('A Menu with that ID does not exist!')
    } else {
      //console.log(`DELETED ITEM WITH ID = ${menu_header_id}`)
      return {
        menu_header_id: menu_header_id,
      }
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = {
  getMenuHeaderById,
  createMenuHeader,
  deleteMenuHeader,
  getAllMenuHeadersByMenu,
  updateMenuHeader,
}
