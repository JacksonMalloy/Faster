const { hash, compare } = require('bcryptjs')
const { createToken } = require('../../utils')

const getAdminById = async ({ admin_id }, context) => {
  const query = `SELECT * FROM "fm"."admins" WHERE admin_id = $1`
  const params = [admin_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getAdminsByOrganization = async ({ organization_id }, context) => {
  const query = `SELECT * FROM "fm"."admins" WHERE organization_id = $1`
  const params = [organization_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const registerAdmin = async ({ phone, email, name, password }, context) => {
  const query = `INSERT INTO "fm"."admins" (phone, email, name, password) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *`

  const hashedPassword = await hash(password, 10)
  const params = [phone, email, name, hashedPassword]

  try {
    const result = await context.pool.query(query, params)
    // Return null if account phone/email already exists
    if (result.rowCount === 0) {
      throw new Error('An Admin with that email already exists!')
    }

    const token = createToken(result.rows[0].admin_id)
    //console.log(`ADMIN TOKEN GENERATED: `, token)

    return Object.assign(result.rows[0], { token })
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const registerDirector = async ({ phone, email, name, password }, context) => {
  const query = `INSERT INTO "fm"."admins" (phone, email, name, password, permissions) VALUES ($1, $2, $3, $4, $5) RETURNING *`

  const hashedPassword = await hash(password, 10)
  const permissions = 'DIRECTOR'
  const params = [phone, email, name, hashedPassword, permissions]

  try {
    const result = await context.pool.query(query, params)
    // Return null if account phone/email already exists
    if (result.rowCount === 0) {
      throw new Error('An Admin with that email already exists!')
    }

    const token = createToken(result.rows[0].admin_id)
    //console.log(`DIRECTOR TOKEN GENERATED: `, token)

    return Object.assign(result.rows[0], { token }, { permissions })
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const loginAdmin = async ({ email, password }, context) => {
  const query = `SELECT * FROM "fm"."admins" WHERE email = $1`
  const params = [email]

  try {
    const result = await context.pool.query(query, params)

    if (result.rows.length === 0) {
      throw new Error(`No admin found with email: ${email}`)
    }

    const passwordValid = await compare(password, result.rows[0].password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }

    const token = createToken(result.rows[0].admin_id)
    //console.log(`TOKEN GENERATED: `, token)

    return Object.assign(result.rows[0], { token })
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const registerAdminToOrganization = async ({ admin_id, organization_id, auth_token }, context) => {
  const query = `UPDATE "fm"."admins" SET organization_id = $1 WHERE admin_id = $2 RETURNING *`
  const params = [organization_id, admin_id]

  const getOrganizationAuthToken = async (organization_id) => {
    const query = `SELECT auth_token FROM "fm"."organizations" WHERE organization_id = $1`
    const params = [organization_id]

    try {
      const result = await context.pool.query(query, params)

      //console.log(`GOT THE AUTH TOKEN: `, result.rows[0])
      return result.rows[0].auth_token
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  try {
    const authToken = await getOrganizationAuthToken(organization_id)

    // If the passed in token does not match in DB, DON'T connect the accounts
    if (auth_token !== authToken) {
      throw new Error(`Sorry please contact an administrator at this time`)
    } else {
      const result = await context.pool.query(query, params)
      //console.log(result)

      return result.rows[0]
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const deleteAdmin = async ({ admin_id }, context) => {
  const query = `DELETE FROM "fm"."admins" WHERE admin_id = $1`
  const params = [admin_id]

  try {
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('An Admin with that ID does not exist!')
    } else {
      //console.log(`DELETED ADMIN WITH ID = ${admin_id}`)
      return {
        admin_id: admin_id,
      }
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = {
  getAdminById,
  registerAdmin,
  registerDirector,
  loginAdmin,
  registerAdminToOrganization,
  deleteAdmin,
  getAdminsByOrganization,
}
