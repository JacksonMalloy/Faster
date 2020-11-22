import * as jwt from 'jsonwebtoken'
import db from './db/config'
import { Request, Response } from 'express'

const APP_SECRET = 'appsecret321'

export const createToken = (userId: number) => jwt.sign({ userId, expiresIn: '7d' }, APP_SECRET)

export const createOrganizationAuthToken = (name: string) => jwt.sign({ name }, APP_SECRET)

// export const createRefreshToken = (user) => {
//   return jwt.sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: '7d',
//   })
// }

// export const createAccessToken = (user) => {
//   return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: '15m',
//   })
// }

export const sendRefreshToken = (response: Response, token: string) => {
  response.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
  })
}

export const getUser = async (req: Request) => {
  // User Refferer to determine whether to look for customer or admin
  const referrer = req.headers.origin
  const Authorization = req.headers.authorization || ''

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')

    if (referrer === 'http://faster.menu:8080') {
      const { userId } = <any>jwt.verify(token, APP_SECRET)

      // Query User
      const query = `SELECT permissions, customer_id FROM "fm"."customers" WHERE customer_id = $1`
      const params = [userId]

      try {
        const result = await db.query(query, params)

        return result.rows[0]
      } catch (error) {
        console.log(error)
        return null
      }
    }

    if (referrer === 'http://admin.faster.menu:8080') {
      const { userId } = <any>jwt.verify(token, APP_SECRET)

      // Query User
      const query = `SELECT permissions, admin_id, organization_id FROM "fm"."admins" WHERE admin_id = $1`
      const params = [userId]

      try {
        const result = await db.query(query, params)
        return result.rows[0]
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }

  return null
}

export function getUserIdForSubscriptions(context: { connection: { context: { Authorization: any } } }) {
  const Authorization = context.connection.context.Authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = <any>jwt.verify(token, APP_SECRET)
    return verifiedToken && verifiedToken.userId
  }
}

export const isAuthenticated = ({ user }: any) => {
  if (user) {
    return true
  }

  return false
}

export const isAdmin = ({ user }: any) => {
  if (user && user.permissions === 'ADMIN') {
    return true
  }

  return false
}

export const isDirector = ({ user }: any) => {
  console.log(user)
  if (user && user.permissions === 'DIRECTOR') {
    return true
  }

  return false
}

export const isOwner = ({ user }: any, result: any[] | undefined) => {
  const [{ organization_id }]: any = result

  if (user.organization_id === organization_id) {
    return true
  }

  return false
}
