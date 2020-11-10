const { createOrganizationAuthToken } = require('../../utils')

const getAllOrganizations = async (context) => {
  const query = `SELECT * FROM "fm"."organizations"`

  try {
    const result = await context.pool.query(query)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getOrganizationById = async ({ organization_id }, context) => {
  const query = `SELECT * FROM "fm"."organizations" WHERE organization_id = $1`
  const params = [organization_id]

  const getAdminsByOrganization = async (organization_id) => {
    const query = `SELECT * FROM "fm"."admins" WHERE organization_id = $1 AND (permissions = 'ADMIN')`
    const params = [organization_id]

    try {
      const result = await context.pool.query(query, params)

      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  const getDirectorsByOrganization = async (organization_id) => {
    const query = `SELECT * FROM "fm"."admins" WHERE organization_id = $1 AND (permissions = 'DIRECTOR')`
    const params = [organization_id]

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
    const organization_id = result.rows[0].organization_id
    const admins = await getAdminsByOrganization(organization_id)
    const directors = await getDirectorsByOrganization(organization_id)

    return Object.assign(result.rows[0], { admins }, { directors })
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const registerOrganization = async (
  { name, address, city, country_region, phone, website_url, postal_code, sub_address, province },
  context
) => {
  const query = `INSERT INTO "fm"."organizations" (name, address, city, country_region, phone, website_url, postal_code, sub_address, province, auth_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING RETURNING *`

  const auth_token = createOrganizationAuthToken(name)
  //console.log(`TOKEN GENERATED: `, auth_token)

  const params = [
    name,
    address,
    city,
    country_region,
    phone,
    website_url,
    postal_code,
    sub_address,
    province,
    auth_token,
  ]

  try {
    const result = await context.pool.query(query, params)
    // Return null if account name already exists
    if (result.rowCount === 0) {
      throw new Error('An Organization with that name already exists!')
    }

    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const deleteOrganization = async ({ organization_id }, context) => {
  const query = `DELETE FROM "fm"."organizations" WHERE organization_id = $1`
  const params = [organization_id]

  try {
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('An Organization with that ID does not exist!')
    } else {
      //console.log(`DELETED ORGANIZATION WITH ID = ${organization_id}`)
      return {
        organization_id: organization_id,
      }
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

// Carefyl because this will allow users to rename organization to the same as another!
// Make sure to handle error more gracefully!
// name, address, city, country_region, phone, website_url, postal_code, sub_address, province
const updateOrganization = async (
  { organization_id, name, address, city, country_region, phone, website_url, postal_code, sub_address, province },
  context
) => {
  const query = `UPDATE "fm"."organizations" SET name = $1 WHERE organization_id = $2 RETURNING *`
  const params = [name, organization_id]

  try {
    const result = await context.pool.query(query, params)

    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  registerOrganization,
  deleteOrganization,
  updateOrganization,
}
