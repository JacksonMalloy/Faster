import { AdminQueries, AdminMutations } from './models/admin/resolvers'
import { CustomerQueries, CustomerMutations } from './models/customer/resolvers'
import { MenuQueries, MenuMutations } from './models/menu/resolvers'
import { MenuChoiceQueries, MenuChoiceMutations } from './models/menuchoice/resolvers'
import { MenuHeaderQueries, MenuHeaderMutations } from './models/menuheader/resolvers'
import { MenuItemQueries, MenuItemMutations } from './models/menuitem/resolvers'
import { MenuSelectionQueries, MenuSelectionMutations } from './models/menuselection/resolvers'
import { OrderMutations, OrderSubscriptions } from './models/orders/resolvers'
import { TenantMutations, TenantQueries } from './models/tenant/resolvers'
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
    ...TenantQueries,
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
    ...TenantMutations,
    ...ImageMutations,
    ...StripeMutations,
    ...TwilioMutations,
  },
  Subscription: {
    ...OrderSubscriptions,
  },
  Admin: {
    tenant: async (parent: { admin_id: number }, args: any, context: any, info: any) => {
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
                      FROM "fm"."tenants" o
                      INNER JOIN "fm"."admins" a
                      ON o.tenant_id = a.tenant_id
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
    tenants: async (parent: { customer_id: number }, args: any, context: any, info: any) => {
      const query = `
          SELECT
                o.name
          FROM
                "fm"."customers_to_tenants" c2o
          INNER JOIN
                "fm"."customers" c
              ON c2o.customer_id = c.customer_id
          INNER JOIN
              "fm"."tenants" o
              ON c2o.tenant_id = o.tenant_id
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
  Tenant: {
    menus: async (parent: { tenant_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."menus"
                    WHERE tenant_id = $1 AND published = false`

      const params = [parent.tenant_id]

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
      const query = `SELECT * FROM "fm"."items" WHERE menu_id = $1`
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
    menu_choices: async (parent: { item_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT
                      *
                    FROM
                      "fm"."choices" c
                    INNER JOIN
                      "fm"."choices_to_items" mci
                    ON c.choice_id = mci.choice_id
                    INNER JOIN
                      "fm"."items" i
                      ON mci.item_id = i.item_id
                    WHERE i.item_id = $1`

      const params = [parent.item_id]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    },
    menu_header: async (parent: { header_id: number }, args: any, context: any, info: any) => {
      // console.log({ parent })
      // const menuChoice = await loaders.menuChoices.load(parent.item_id)

      // console.log({ menuChoice })

      const query = `SELECT * FROM "fm"."headers" WHERE header_id = $1`
      const params = [parent.header_id]

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
    selections: async (parent: { choice_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."selections" s
                       INNER JOIN "fm"."selections_to_choices" msc
                        ON s.selection_id = msc.selection_id
                        INNER JOIN  "fm"."choices" c
                        ON msc.choice_id = c.choice_id
                        WHERE c.choice_id = $1`
      const params = [parent.choice_id]

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
    menu_items: async (parent: { header_id: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."items" mi INNER JOIN
                    "fm"."headers" mh
                    ON mi.header_id = mh.header_id
                    WHERE mh.header_id = $1`

      const params = [parent.header_id]

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
