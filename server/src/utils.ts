import * as jwt from 'jsonwebtoken'
import db from './db/config'
import { Request, Response } from 'express'

const APP_SECRET = 'appsecret321'

export const createToken = (userId: number) => jwt.sign({ userId, expiresIn: '7d' }, APP_SECRET)

export const createTenantAuthToken = (name: string) => jwt.sign({ name }, APP_SECRET)

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

    if (referrer === 'http://buy.faster.menu:8080') {
      const { userId } = <any>jwt.verify(token, APP_SECRET)

      // Query User
      const query = `SELECT permissions, customerId FROM "fm"."customers" WHERE customerId = $1`
      const params = [userId]

      try {
        const result = await db.query(query, params)

        return result.rows[0]
      } catch (error) {
        console.log(error)
        return null
      }
    }

    if (referrer === 'http://sell.faster.menu:8080') {
      const { userId } = <any>jwt.verify(token, APP_SECRET)

      // Query User
      const query = `SELECT permissions, adminId, tenantId FROM "fm"."admins" WHERE adminId = $1`
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
  const [{ tenantId }]: any = result

  if (user.tenantId === tenantId) {
    return true
  }

  return false
}

const isArray = function (a: any) {
  return Array.isArray(a)
}

const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

const toCamel = (s: any) => {
  return s.replace(/([-_][a-z])/gi, ($1: any) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

export const keysToCamel = function (o: any) {
  if (isObject(o)) {
    const n = {} as any

    Object.keys(o).forEach((k: any) => {
      n[toCamel(k)] = keysToCamel(o[k])
    })

    return n
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i)
    })
  }

  return o
}

export const keysToSnake = (obj: any) => {
  if (typeof obj != 'object') return obj

  for (let oldName in obj) {
    // Camel to underscore
    const newName = oldName.replace(/([A-Z])/g, function ($1) {
      return '_' + $1.toLowerCase()
    })

    // Only process if names are different
    if (newName !== oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName]
        delete obj[oldName]
      }
    }

    // Recursion
    if (typeof obj[newName] == 'object') {
      obj[newName] = keysToSnake(obj[newName])
    }
  }
  return obj
}
