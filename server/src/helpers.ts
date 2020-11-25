import { keysToSnake } from './utils'

const isObject = (data: {}) => data !== null && typeof data === 'object'
const isObjEmpty = (obj: {}) => isObject(obj) && Object.keys(obj).length === 0
/**
 * tableName: `users`
 * conditions: { id: 'joe-unique-id', ... }
 * data: { username: 'Joe', age: 28, status: 'active', ... }
 *
 *  "UPDATE users SET field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */
export const update = (
  tableName: string,
  conditions: any = {},
  data: any = {}
): { query: string; params: string[] } => {
  // Strips all undefined key/value pairs
  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key])

  const dKeys = Object.keys(keysToSnake(data))
  const dataTuples = dKeys.map((key, index) => `${key} = $${index + 1}`)
  const updates = dataTuples.join(', ')
  const len = Object.keys(data).length

  let query = `UPDATE ${tableName} SET ${updates} `

  if (!isObjEmpty(conditions)) {
    const keys = Object.keys(keysToSnake(conditions))
    const condTuples = keys.map((key, index) => `${key} = $${index + 1 + len} `)
    const condPlaceholders = condTuples.join(' AND ')

    query += ` WHERE ${condPlaceholders} RETURNING *`
  }

  const params: any[] = []

  Object.keys(data).forEach((key) => {
    params.push(data[key])
  })

  Object.keys(conditions).forEach((key) => {
    params.push(conditions[key])
  })

  console.log({ query })

  return { query, params }
}
