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
    tenant: async (parent: { adminId: number }, args: any, context: any, info: any) => {
      const query = `SELECT o.accessCode,
                      o.address,
                      o.city,
                      o.phone,
                      o.websiteUrl,
                      o.postalCode,
                      o.province,
                      o.subAddress,
                      o.countryRegion,
                      o.name
                      FROM "fm"."tenants" o
                      INNER JOIN "fm"."admins" a
                      ON o.tenantId = a.tenantId
                      WHERE a.adminId = $1`

      const params = [parent.adminId]

      try {
        const result = await db.query(query, params)

        return result.rows[0]
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
              ON c2o.customerId = c.customerId
          INNER JOIN
              "fm"."tenants" o
              ON c2o.tenantId = o.tenantId
          WHERE c.customerId = $1`
      const params = [parent.customerId]

      try {
        const result = await db.query(query, params)
        //console.log(result.rows)
        return result.rows
      } catch (error) {
           throw error
      }
    },
  },
  // Change published to true in prod
  Tenant: {
    menus: async (parent: { tenantId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."menus"
                    WHERE tenantId = $1 AND published = false`

      const params = [parent.tenantId]

      try {
        const result = await db.query(query, params)
        //console.log(result.rows)
        return result.rows
      } catch (error) {
           throw error
      }
    },
  },
  Menu: {
    image: async (parent: { menuId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."images"
                    WHERE menuId = $1`

      const params = [parent.menuId]

      try {
        const result = await db.query(query, params)
        //console.log(result.rows)
        return result.rows[0]
      } catch (error) {
           throw error
      }
    },
    menuItems: async (parent: { menuId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."items" WHERE menuId = $1`
      const params = [parent.menuId]

      try {
        const result = await db.query(query, params)

        return result.rows
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
                    ON c.choiceId = mci.choiceId
                    INNER JOIN
                      "fm"."items" i
                      ON mci.itemId = i.itemId
                    WHERE i.itemId = $1`

      const params = [parent.itemId]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
           throw error
      }
    },
    menuHeader: async (parent: { headerId: number }, args: any, context: any, info: any) => {
      // console.log({ parent })
      // const menuChoice = await loaders.menuChoices.load(parent.itemId)

      // console.log({ menuChoice })

      const query = `SELECT * FROM "fm"."headers" WHERE headerId = $1`
      const params = [parent.headerId]

      try {
        const result = await db.query(query, params)
        //console.log(result.rows)
        return result.rows[0]
      } catch (error) {
           throw error
      }
    },
  },
  MenuChoice: {
    selections: async (parent: { choiceId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."selections" s
                       INNER JOIN "fm"."selections_to_choices" msc
                        ON s.selectionId = msc.selectionId
                        INNER JOIN  "fm"."choices" c
                        ON msc.choiceId = c.choiceId
                        WHERE c.choiceId = $1`
      const params = [parent.choiceId]

      try {
        const result = await db.query(query, params)
        return result.rows
      } catch (error) {
           throw error
      }
    },
  },
  MenuHeader: {
    menuItems: async (parent: { headerId: number }, args: any, context: any, info: any) => {
      const query = `SELECT * FROM "fm"."items" mi INNER JOIN
                    "fm"."headers" mh
                    ON mi.headerId = mh.headerId
                    WHERE mh.headerId = $1`

      const params = [parent.headerId]

      try {
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
           throw error
      }
    },
  },
}
