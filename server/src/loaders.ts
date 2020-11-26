import DataLoader from 'dataloader'
// const jwt = require('jsonwebtoken')
// const APP_SECRET = 'appsecret321'
import db from './db/config'
import { keysToCamel } from './utils'

export function createLoaders(user: any) {
  // console.log('USER HERE: ', user)

  const getMenuItemChoices = async (ids: readonly unknown[]) => {
    const query = `SELECT
                  *
                FROM
                  "fm"."choices" c
                INNER JOIN
                  "fm"."choices_to_items" mci
                ON c.choiceId = mci.choiceId
                INNER JOIN
                  "fm"."items" i
                  ON mci.itemId = i.itemId
                WHERE i.itemId = ANY ($1)`

    const params = [ids]

    try {
      const result = await db.query(query, params)

      console.log(result.rows)

      return keysToCamel(result.rows)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    menuChoices: new DataLoader((ids) => getMenuItemChoices(ids)),
  }
}
