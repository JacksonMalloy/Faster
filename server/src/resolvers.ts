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
import { keysToCamel } from './utils'

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
    tenant: async (parent: { adminId: number }, args: any, context: any, info: any) => {
      const query = `SELECT o.accessCode,
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

      const params = [parent.adminId]

      try {
        const result = await db.query(query, params)

        return keysToCamel(result.rows[0])
      } catch (error) {
        throw error
      }
    },
  },
  Customer: {
    tenants: async (parent: { customerId: number }, args: any, context: any, info: any) => {
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
      const params = [parent.customerId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    },
  },
  // Change published to true in prod
  Tenant: {
    menus: async (parent: { tenantId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."menus"
                    WHERE tenant_id = $1 AND published = false`

      const params = [parent.tenantId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    },
  },
  Menu: {
    image: async (parent: { menuId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."images"
                    WHERE menu_id = $1`

      const params = [parent.menuId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows[0])
      } catch (error) {
        throw error
      }
    },
    menuItems: async (parent: { menuId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."items" WHERE menu_id = $1`
      const params = [parent.menuId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    },
  },
  // Need to add Type queries with Dataloader here
  MenuItem: {
    menuChoices: async (parent: { itemId: number }, args: any, context: any, info: any) => {
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

      const params = [parent.itemId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    },
    menuHeader: async (parent: { headerId: number }, args: any, context: any, info: any) => {
      // console.log({ parent })
      // const menuChoice = await loaders.menuChoices.load(parent.itemId)

      // console.log({ menuChoice })

      const query = `SELECT * FROM "fm"."headers" WHERE header_id = $1`
      const params = [parent.headerId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows[0])
      } catch (error) {
        throw error
      }
    },
  },
  MenuChoice: {
    selections: async (parent: { choiceId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."selections" s
                       INNER JOIN "fm"."selections_to_choices" msc
                        ON s.selection_id = msc.selection_id
                        INNER JOIN  "fm"."choices" c
                        ON msc.choice_id = c.choice_id
                        WHERE c.choice_id = $1`
      const params = [parent.choiceId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    },
  },
  MenuHeader: {
    menuItems: async (parent: { headerId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."items" mi INNER JOIN
                    "fm"."headers" mh
                    ON mi.header_id = mh.header_id
                    WHERE mh.header_id = $1`

      const params = [parent.headerId]

      try {
        const result = await db.query(query, params)

        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    },
  },
}
