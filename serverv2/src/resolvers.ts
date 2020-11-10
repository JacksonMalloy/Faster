import { AdminQueries, AdminMutations } from './models/admin/resolvers'
import { CustomerQueries, CustomerMutations } from './models/customer/resolvers'
import { MenuQueries, MenuMutations } from './models/menu/resolvers'
import { MenuChoiceQueries, MenuChoiceMutations } from './models/menuchoice/resolvers'
import { MenuHeaderQueries, MenuHeaderMutations } from './models/menuheader/resolvers'
import { MenuItemQueries, MenuItemMutations } from './models/menuitem/resolvers'
import { MenuSelectionQueries, MenuSelectionMutations } from './models/menuselection/resolvers'
import { OrderMutations, OrderSubscriptions } from './models/orders/resolvers'
import { OrganizationMutations, OrganizationQueries } from './models/organization/resolvers'
import { ActiveUserQueries } from './models/activeuser/resolvers'
import { ImageMutations, ImageQueries } from './models/image/resolvers'
import { StripeMutations } from './models/stripe/resolvers'
import { TwilioMutations } from './models/twilio/resolvers'

import db from './db/config'

export const resolvers = {
  Query: {
    ...AdminQueries,
    ...CustomerQueries,
    ...MenuQueries,
    ...MenuChoiceQueries,
    ...MenuHeaderQueries,
    ...MenuItemQueries,
    ...MenuSelectionQueries,
    ...OrganizationQueries,
    ...ActiveUserQueries,
    ...ImageQueries,
  },
  Mutation: {
    ...AdminMutations,
    ...CustomerMutations,
    ...MenuMutations,
    ...MenuChoiceMutations,
    ...MenuHeaderMutations,
    ...MenuItemMutations,
    ...MenuSelectionMutations,
    ...OrderMutations,
    ...OrganizationMutations,
    ...ImageMutations,
    ...StripeMutations,
    ...TwilioMutations,
  },
  Subscription: {
    ...OrderSubscriptions,
  },
  Admin: {
    organization: async (parent: { admin_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT o.access_code,
                      o.address,
                      o.city,
                      o.phone,
                      o.website_url,
                      o.postal_code,
                      o.province,
                      o.sub_address,
                      o.country_region,
                      o.name
                      FROM "fm"."organizations" o
                      INNER JOIN "fm"."admins" a
                      ON o.organization_id = a.organization_id
                      WHERE a.admin_id = $1`

      const params = [parent.admin_id]

      try {
        const result = await db.query(query, params)

        return result.rows[0]
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
  },
  Customer: {
    organizations: async (parent: { customer_id: number }, args: any, context: any, info: any) => {
      const query = `
          SELECT
                o.name
          FROM
                "fm"."customers_to_organizations" c2o
          INNER JOIN
                "fm"."customers" c
              ON c2o.customer_id = c.customer_id
          INNER JOIN
              "fm"."organizations" o
              ON c2o.organization_id = o.organization_id
          WHERE c.customer_id = $1`
      const params = [parent.customer_id]

      try {
        const result = await db.query(query, params)
        //console.log(result.rows)
        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
  },
  // Change published to true in prod
  Organization: {
    menus: async (parent: { organization_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."menus"
                    WHERE organization_id = $1 AND published = false`

      const params = [parent.organization_id]

      try {
        const result = await db.query(query, params)
        //console.log(result.rows)
        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
  },
  Menu: {
    image: async (parent: { menu_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."images"
                    WHERE menu_id = $1`

      const params = [parent.menu_id]

      try {
        const result = await db.query(query, params)
        //console.log(result.rows)
        return result.rows[0]
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
    menu_items: async (parent: { menu_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."menuitems" WHERE menu_id = $1`
      const params = [parent.menu_id]

      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
  },
  // Need to add Type queries with Dataloader here
  MenuItem: {
    menu_choices: async (parent: { menu_item_id: number }, args: any, context: any, info: any) => {
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
                    WHERE i.menu_item_id = $1`

      const params = [parent.menu_item_id]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
    menu_header: async (parent: { menu_header_id: number }, args: any, context: any, info: any) => {
      // console.log({ parent })
      // const menuChoice = await loaders.menuChoices.load(parent.menu_item_id)

      // console.log({ menuChoice })

      const query = `SELECT * FROM "fm"."menuheaders" WHERE menu_header_id = $1`
      const params = [parent.menu_header_id]

      try {
        const result = await db.query(query, params)
        //console.log(result.rows)
        return result.rows[0]
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
  },
  MenuChoice: {
    selections: async (parent: { menu_choice_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."menuselections" s
                       INNER JOIN "fm"."menuselections_to_menuchoices" msc
                        ON s.menu_selection_id = msc.menu_selection_id
                        INNER JOIN  "fm"."menuchoices" c
                        ON msc.menu_choice_id = c.menu_choice_id
                        WHERE c.menu_choice_id = $1`
      const params = [parent.menu_choice_id]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
  },
  MenuHeader: {
    menu_items: async (parent: { menu_header_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."menuitems" mi INNER JOIN
                    "fm"."menuheaders" mh
                    ON mi.menu_header_id = mh.menu_header_id
                    WHERE mh.menu_header_id = $1`

      const params = [parent.menu_header_id]

      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
  },
}
