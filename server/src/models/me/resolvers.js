const { getUserId } = require('../../utils')

const getCurrentAdminById = async (context) => {
  const query = `SELECT phone, admin_id, organization_id, email, name, permissions, created_at FROM "fm"."admins" WHERE admin_id = $1`
  const userId = getUserId(context)
  const params = [userId]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getCurrentCustomerById = async (context) => {
  const query = `SELECT phone, admin_id, organization_id, email, name, permissions, created_at FROM "fm"."admins" WHERE admin_id = $1`
  const userId = getUserId(context)
  const params = [userId]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = {
  getCurrentAdminById,
  getCurrentCustomerById,
}
