import db from '../../db/config'
import { createOrganizationAuthToken } from '../../utils'
import { update } from '../../helpers'

type RegisterOrganizationArgs = {
  name: string
  address: string
  city: string
  country_region: string
  phone: string
  website_url: string
  postal_code: string
  sub_address: string
  province: string
}

type UpdateOrganizationArgs = {
  name: string
  address: string
  organization_id: number
  city: string
  country_region: string
  phone: string
  website_url: string
  postal_code: string
  sub_address: string
  province: string
}

export default class OrganizationRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getAllOrganizations() {
    const query = `SELECT * FROM "fm"."organizations"`

    try {
      const result = await db.query(query)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getOrganizationByAccessCode(access_code: string) {
    const query = `SELECT * FROM "fm"."organizations" WHERE access_code = $1`
    const params = [access_code]

    try {
      const result = await db.query(query, params)

      console.log(result.rows)

      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getOrganizationById(organization_id: number) {
    const query = `SELECT * FROM "fm"."organizations" WHERE organization_id = $1`
    const params = [organization_id]

    const getAdminsByOrganization = async (organization_id: number) => {
      const query = `SELECT * FROM "fm"."admins" WHERE organization_id = $1 AND (permissions = 'ADMIN')`
      const params = [organization_id]

      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    }

    const getDirectorsByOrganization = async (organization_id: number) => {
      const query = `SELECT * FROM "fm"."admins" WHERE organization_id = $1 AND (permissions = 'DIRECTOR')`
      const params = [organization_id]

      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    }

    try {
      const result = await db.query(query, params)
      const organization_id = result.rows[0].organization_id
      const admins = await getAdminsByOrganization(organization_id)
      const directors = await getDirectorsByOrganization(organization_id)

      return Object.assign(result.rows[0], { admins }, { directors })
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async registerOrganization(args: RegisterOrganizationArgs) {
    const { name, address, city, country_region, phone, website_url, postal_code, sub_address, province } = args

    const query = `INSERT INTO "fm"."organizations" (name, address, city, country_region, phone, website_url, postal_code, sub_address, province, auth_token, access_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING RETURNING *`

    const createOrganizationWithAccessCode = async () => {
      const auth_token = createOrganizationAuthToken(name)
      //console.log(`TOKEN GENERATED: `, auth_token)

      function generateAccessCode() {
        return shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).join('').substring(0, 4)
      }

      function shuffle(values: string[]) {
        for (
          var j, x, i = values.length;
          i;
          j = Math.floor(Math.random() * i), x = values[--i], values[i] = values[j], values[j] = x
        );
        return values
      }
      const access_code = generateAccessCode()

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
        access_code,
      ]

      try {
        const result = await db.query(query, params)

        if (result.rowCount === 0) {
          createOrganizationWithAccessCode()
        }

        return {
          code: 201,
          message: 'Organization created.',
          success: true,
          organization: result.rows[0],
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

    return createOrganizationWithAccessCode()
  }

  async deleteOrganization(organization_id: number) {
    const query = `DELETE FROM "fm"."organizations" WHERE organization_id = $1`
    const params = [organization_id]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The organization no longer exists!',
          success: false,
        }
      } else {
        return {
          code: 204,
          message: 'The organization was deleted',
          success: true,
          organization: {
            organization_id: organization_id,
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

  // Careful because this will allow users to rename organization to the same as another!
  // Make sure to handle error more gracefully!
  // name, address, city, country_region, phone, website_url, postal_code, sub_address, province
  async updateOrganization(args: UpdateOrganizationArgs) {
    const {
      organization_id,
      name,
      address,
      city,
      country_region,
      phone,
      website_url,
      postal_code,
      sub_address,
      province,
    } = args

    const fields = { name, address, city, country_region, phone, website_url, postal_code, sub_address, province }
    const conditions = { organization_id }

    const { query, params } = update(`"fm"."menuitems"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Organization updated!',
        success: true,
        organization: result.rows[0],
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
