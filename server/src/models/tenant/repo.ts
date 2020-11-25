import db from '../../db/config'
import { createTenantAuthToken, keysToCamel } from '../../utils'
import { update } from '../../helpers'

type RegisterTenantArgs = {
  name: string
  address: string
  city: string
  countryRegion: string
  phone: string
  websiteUrl: string
  postalCode: string
  subAddress: string
  province: string
}

type UpdateTenantArgs = {
  name: string
  address: string
  tenantId: number
  city: string
  countryRegion: string
  phone: string
  websiteUrl: string
  postalCode: string
  subAddress: string
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
      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  async getTenantByAccessCode(accessCode: string) {
    const query = `SELECT * FROM "fm"."tenants" WHERE access_code = $1`
    const params = [accessCode]

    try {
      const result = await db.query(query, params)

      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  async getTenantById(tenantId: number) {
    const query = `SELECT * FROM "fm"."tenants" WHERE tenant_id = $1`
    const params = [tenantId]

    const getAdminsByTenant = async (tenantId: number) => {
      const query = `SELECT * FROM "fm"."admins" WHERE tenant_id = $1 AND (permissions = 'ADMIN')`
      const params = [tenantId]

      try {
        const result = await db.query(query, params)

        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    }

    const getDirectorsByTenant = async (tenantId: number) => {
      const query = `SELECT * FROM "fm"."admins" WHERE tenant_id = $1 AND (permissions = 'DIRECTOR')`
      const params = [tenantId]

      try {
        const result = await db.query(query, params)

        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    }

    try {
      const result = await db.query(query, params)
      const tenantId = result.rows[0].tenantId
      const admins = await getAdminsByTenant(tenantId)
      const directors = await getDirectorsByTenant(tenantId)

      return Object.assign(keysToCamel(result.rows[0]), { admins }, { directors })
    } catch (error) {
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async registerTenant(args: RegisterTenantArgs) {
    const { name, address, city, countryRegion, phone, websiteUrl, postalCode, subAddress, province } = args

    const query = `INSERT INTO "fm"."tenants" (name, address, city, country_region, phone, website_url, postal_code, sub_address, province, auth_token, access_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING RETURNING *`

    const createTenantWithAccessCode = async () => {
      const authToken = createTenantAuthToken(name)
      //console.log(`TOKEN GENERATED: `, authToken)

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

      const accessCode = generateAccessCode()

      const params = [
        name,
        address,
        city,
        countryRegion,
        phone,
        websiteUrl,
        postalCode,
        subAddress,
        province,
        authToken,
        accessCode,
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
          tenant: keysToCamel(result.rows[0]),
        }
      } catch (error) {
        return {
          code: 503,
          message: error,
          success: false,
        }
      }
    }

    return createTenantWithAccessCode()
  }

  async deleteTenant(tenantId: number) {
    const query = `DELETE FROM "fm"."tenants" WHERE tenant_id = $1`
    const params = [tenantId]

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
        }
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  // Careful because this will allow users to rename tenant to the same as another!
  // Make sure to handle error more gracefully!
  // name, address, city, countryRegion, phone, websiteUrl, postalCode, subAddress, province
  async updateTenant(args: UpdateTenantArgs) {
    const { tenantId, name, address, city, countryRegion, phone, websiteUrl, postalCode, subAddress, province } = args

    const fields = { name, address, city, countryRegion, phone, websiteUrl, postalCode, subAddress, province }
    const conditions = { tenantId }

    const { query, params } = update(`"fm"."tenants"`, conditions, fields)

    try {
      const result = await db.query(query, params)

      return {
        code: 200,
        message: 'Tenant updated!',
        success: true,
        tenant: keysToCamel(result.rows[0]),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }
}
