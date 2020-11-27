import MenuItemRepository from './repo'
import { isAuthenticated, isAdmin, isDirector, isOwner, keysToCamel } from '../../utils'
import db from '../../db/config'

type CreateItemArgs = {
  menuId: number
  headerId: number | null
  basePrice: string
  description: string
  name: string
}

type UpdateItemArgs = {
  menuId: number
  itemId: number
  headerId: number
  basePrice: string
  description: string
  name: string
}

export const MenuItemQueries = {
  menuItem: async (parent: any, { itemId }: { itemId: number }, context: any, info: any) => {
    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.getMenuItemById(itemId)
    return data
  },
  menuItemsByTenant: async (parent: any, { tenantId }: { tenantId: number }, context: any, info: any) => {
    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.getAllMenuItemsByTenantId(tenantId)
    return data
  },
  menuItemsByMenu: async (parent: any, { menuId }: { menuId: number }, context: any, info: any) => {
    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.getAllMenuItemsByMenu(menuId)
    return data
  },
}

export const MenuItemMutations = {
  createMenuItem: async (parent: any, args: CreateItemArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const getTenantId = async ({ menuId }: { menuId: number }) => {
      try {
        const query = `SELECT tenant_id
                      FROM "fm"."menus"
                      WHERE menu_id = $1`

        const params = [menuId]
        const result = await db.query(query, params)

        return keysToCamel(result.rows)
      } catch (error) {
        console.log(error)
      }
    }

    const result = await getTenantId(args)

    if (!isOwner(context, result)) return { code: 403, message: 'Forbidden', success: false }

    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.createMenuItem(args)

    return data
  },
  updateMenuItem: async (parent: any, args: UpdateItemArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.updateMenuItem(args)
    return data
  },
  deleteMenuItem: async (parent: any, { itemId }: { itemId: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.deleteMenuItem(itemId)
    return data
  },
}
