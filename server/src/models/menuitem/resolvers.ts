import MenuItemRepository from './repo'
import { isAuthenticated, isAdmin, isDirector, isOwner } from '../../utils'
import db from '../../db/config'

type CreateItemArgs = {
  menu_id: number
  header_id: number | null
  base_price: string
  description: string
  name: string
}

type UpdateItemArgs = {
  menu_id: number
  item_id: number
  header_id: number
  base_price: string
  description: string
  name: string
}

export const MenuItemQueries = {
  menuItem: async (parent: any, { item_id }: { item_id: number }, context: any, info: any) => {
    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.getMenuItemById(item_id)
    return data
  },
  menuItemsByTenant: async (parent: any, { tenant_id }: { tenant_id: number }, context: any, info: any) => {
    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.getAllMenuItemsByTenantId(tenant_id)
    return data
  },
  menuItemsByMenu: async (parent: any, { menu_id }: { menu_id: number }, context: any, info: any) => {
    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.getAllMenuItemsByMenu(menu_id)
    return data
  },
}

export const MenuItemMutations = {
  addMenuItem: async (parent: any, args: CreateItemArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const getTenantId = async ({ menu_id }: { menu_id: number }) => {
      try {
        const query = `SELECT tenant_id
                      FROM "fm"."menus"
                      WHERE menu_id = $1`

        const params = [menu_id]
        const result = await db.query(query, params)

        return result.rows
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
  editMenuItem: async (parent: any, args: UpdateItemArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.updateMenuItem(args)
    return data
  },
  removeMenuItem: async (parent: any, { item_id }: { item_id: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.deleteMenuItem(item_id)
    return data
  },
}
