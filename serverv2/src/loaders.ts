import DataLoader from 'dataloader'
// const jwt = require('jsonwebtoken')
// const APP_SECRET = 'appsecret321'
import db from './db/config'

export function createLoaders(user: any) {
  console.log('USER HERE: ', user)

  const getMenuItemChoices = async (ids: readonly unknown[]) => {
    const query = `SELECT
                  *
                FROM
                  "fm"."menuchoices" c
                INNER JOIN
                  "fm"."menuchoices_to_menuitems" mci
                ON c.menu_choice_id = mci.menu_choice_id
                INNER JOIN
                  "fm"."menuitems" i
                  ON mci.menu_item_id = i.menu_item_id
                WHERE i.menu_item_id = ANY ($1)`

    const params = [ids]

    try {
      const result = await db.query(query, params)

      console.log(result.rows)
      return result.rows
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    menuChoices: new DataLoader((ids) => getMenuItemChoices(ids)),
  }
}
