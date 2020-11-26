import { hash, compare } from 'bcryptjs'
import { createToken, keysToCamel } from '../../utils'
import db from '../../db/config'
import { sendPasswordResetEmail } from '../../email'

type AdminRegistrationArgs = {
  phone: string
  email: string
  name: string
  password: string
}

type AdminToOrgArgs = {
  adminId: number
  tenantId: number
  authToken: string
}

type LoginArgs = {
  email: string
  password: string
}

type ResetPasswordArgs = {
  email: string
}

export default class AdminRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  async getAdminById(adminId: number) {
    const query = `SELECT * FROM "fm"."admins" WHERE admin_id = $1`
    const params = [adminId]

    try {
      const result = await db.query(query, params)

      return keysToCamel(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  async getAdminsByTenant(tenantId: number) {
    const query = `SELECT * FROM "fm"."admins" WHERE tenant_id = $1`
    const params = [tenantId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async registerAdmin(args: AdminRegistrationArgs) {
    const { phone, email, name, password } = args
    const query = `INSERT INTO "fm"."admins" (phone, email, name, password) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *`
    const hashedPassword = await hash(password, 10)
    const params = [phone, email, name, hashedPassword]

    try {
      const result = await db.query(query, params)
      if (result.rowCount === 0) {
        return {
          code: 409,
          message: 'A user with this phone and email already exists.',
          success: false,
        }
      }

      const adminId = result.rows[0].admin_id
      const token = createToken(adminId)

      return {
        code: 201,
        message: 'User created.',
        success: true,
        admin: Object.assign(keysToCamel(result.rows[0]), { token }),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async registerDirector(args: AdminRegistrationArgs) {
    const { phone, email, name, password } = args
    const query = `INSERT INTO "fm"."admins" (phone, email, name, password, permissions) VALUES ($1, $2, $3, $4, $5) RETURNING *`

    const doesUserWithPhoneExist = async (phone: string) => {
      const query = `SELECT * FROM "fm"."admins" WHERE phone = $1`
      const params = [phone]

      try {
        const result = await db.query(query, params)
        if (result.rows.length) return true
        return false
      } catch (error) {
        console.log(error)
        return true
      }
    }

    const doesUserWithEmailExist = async (email: string) => {
      const query = `SELECT * FROM "fm"."admins" WHERE email = $1`
      const params = [email]

      try {
        const result = await db.query(query, params)
        if (result.rows.length) return true
        return false
      } catch (error) {
        console.log(error)
        return true
      }
    }

    const phoneExists = await doesUserWithPhoneExist(phone)
    const emailExists = await doesUserWithEmailExist(email)

    console.log({ phoneExists })
    console.log({ emailExists })

    if (phoneExists) {
      return {
        code: 409,
        message: 'A user with this phone already exists.',
        success: false,
        type: 'phone',
      }
    }

    if (emailExists) {
      return {
        code: 409,
        message: 'A user with this email already exists.',
        success: false,
        type: 'email',
      }
    }

    const hashedPassword = await hash(password, 10)
    const permissions = 'DIRECTOR'
    const params = [phone, email, name, hashedPassword, permissions]

    try {
      const result = await db.query(query, params)
      const adminId = result.rows[0].admin_id
      const token = createToken(adminId)

      return {
        code: 201,
        message: 'User created.',
        success: true,
        type: null,
        admin: Object.assign(keysToCamel(result.rows[0]), { token }, { permissions }),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
        type: null,
      }
    }
  }

  async loginAdmin(args: LoginArgs) {
    const { email, password } = args
    const query = `SELECT * FROM "fm"."admins" WHERE email = $1`
    const params = [email]

    try {
      const result = await db.query(query, params)

      if (result.rows.length === 0) {
        return {
          code: 404,
          message: `Email ${email} does not exist!`,
          success: false,
        }
      }

      const passwordValid = await compare(password, result.rows[0].password)
      if (!passwordValid) {
        return {
          code: 401,
          message: 'Invalid password!',
          success: false,
        }
      }

      const adminId = result.rows[0].admin_id
      const token = createToken(adminId)

      return {
        code: 200,
        message: 'Successfully logged in!',
        success: true,
        admin: Object.assign(keysToCamel(result.rows[0]), { token }),
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async registerAdminToTenant({ adminId, tenantId, authToken }: AdminToOrgArgs) {
    const query = `UPDATE "fm"."admins" SET tenant_id = $1 WHERE admin_id = $2 RETURNING *`
    const params = [tenantId, adminId]

    const getTenantAuthToken = async (tenantId: number) => {
      const query = `SELECT auth_token FROM "fm"."tenants" WHERE tenant_id = $1`
      const params = [tenantId]

      try {
        const result = await db.query(query, params)

        const authToken = result.rows[0].auth_token

        return authToken
      } catch (error) {
        throw error
      }
    }

    try {
      const authToken = await getTenantAuthToken(tenantId)

      // If the passed in token does not match in DB, DON'T connect the accounts
      if (authToken !== authToken) {
        return {
          code: 401,
          message: 'Invalid request, please contact support',
          success: false,
        }
      } else {
        const result = await db.query(query, params)

        return {
          code: 200,
          message: 'Successfully joined tenant!',
          success: true,
          connection: {
            connect: keysToCamel(result.rows),
          },
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

  async deleteAdmin(adminId: number) {
    const query = `DELETE FROM "fm"."admins" WHERE admin_id = $1`
    const params = [adminId]

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        return {
          code: 410,
          message: 'The account no longer exists!',
          success: false,
          admin: {},
        }
      } else {
        return {
          code: 204,
          message: 'The account was deleted',
          success: true,
          admin: {
            adminId: adminId,
          },
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

  async resetPassword({ email }: ResetPasswordArgs) {
    console.log({ email })

    const getUserByEmail = async (email: string) => {
      const query = `SELECT email FROM "fm"."admins" WHERE email = $1`
      const params = [email]

      try {
        const result = await db.query(query, params)

        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    }

    const user = await getUserByEmail(email)

    if (!user.length) {
      return {
        code: 404,
        // Consider hiding this message in the future :)
        message: `No user exists with that email`,
        success: false,
        admin: [],
      }
    }

    // 1.
    // Validate current token time / IP

    // 2.
    // Generate Token

    // 3.
    // Send token in link with email body

    const data = await sendPasswordResetEmail(email).then((data) => data)

    return data
  }
}
