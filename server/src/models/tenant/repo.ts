import db from '../../db/config'
import { createTenantAuthToken } from '../../utils'
import { update } from '../../helpers'

type RegisterTenantArgs = {
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

type UpdateTenantArgs = {
  name: string
  address: string
  tenant_id: number
  city: string
  country_region: string
  phone: string
  website_url: string
  postal_code: string
  sub_address: string
  province: string
}

export default class TenantRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getAllTenants() {
    const query = `SELECT * FROM "fm"."tenants"`

    try {
      const result = await db.query(query)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getTenantByAccessCode(access_code: string) {
    const query = `SELECT * FROM "fm"."tenants" WHERE access_code = $1`
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

  async getTenantById(tenant_id: number) {
    const query = `SELECT * FROM "fm"."tenants" WHERE tenant_id = $1`
    const params = [tenant_id]

    const getAdminsByTenant = async (tenant_id: number) => {
      const query = `SELECT * FROM "fm"."admins" WHERE tenant_id = $1 AND (permissions = 'ADMIN')`
      const params = [tenant_id]

      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    }

    const getDirectorsByTenant = async (tenant_id: number) => {
      const query = `SELECT * FROM "fm"."admins" WHERE tenant_id = $1 AND (permissions = 'DIRECTOR')`
      const params = [tenant_id]

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
      const tenant_id = result.rows[0].tenant_id
      const admins = await getAdminsByTenant(tenant_id)
      const directors = await getDirectorsByTenant(tenant_id)

      return Object.assign(result.rows[0], { admins }, { directors })
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async registerTenant(args: RegisterTenantArgs) {
    const { name, address, city, country_region, phone, website_url, postal_code, sub_address, province } = args

    const query = `INSERT INTO "fm"."tenants" (name, address, city, country_region, phone, website_url, postal_code, sub_address, province, auth_token, access_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING RETURNING *`

    const createTenantWithAccessCode = async () => {
      const auth_token = createTenantAuthToken(name)
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
          createTenantWithAccessCode()
        }

        return {
          code: 201,
          message: 'Tenant created.',
          success: true,
          tenant: result.rows[0],
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

    return createTenantWithAccessCode()
  }

  async deleteTenant(tenant_id: number) {
    const query = `DELETE FROM "fm"."tenants" WHERE tenant_id = $1`
    const params = [tenant_id]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The tenant no longer exists!',
          success: false,
        }
      } else {
        return {
          code: 204,
          message: 'The tenant was deleted',
          success: true,
          tenant: {
            tenant_id: tenant_id,
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

  // Careful because this will allow users to rename tenant to the same as another!
  // Make sure to handle error more gracefully!
  // name, address, city, country_region, phone, website_url, postal_code, sub_address, province
  async updateTenant(args: UpdateTenantArgs) {
    const {
      tenant_id,
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
    const conditions = { tenant_id }

    const { query, params } = update(`"fm"."items"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Tenant updated!',
        success: true,
        tenant: result.rows[0],
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
