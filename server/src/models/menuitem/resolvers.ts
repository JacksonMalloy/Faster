import MenuItemRepository from './repo'
import { isAuthenticated, isAdmin, isDirector, isOwner } from '../../utils'
import db from '../../db/config'

type CreateItemArgs = {
  menu_id: number
  menu_header_id: number | null
  base_price: string
  description: string
  name: string
}

type UpdateItemArgs = {
  menu_id: number
  menu_item_id: number
  menu_header_id: number
  base_price: string
  description: string
  name: string
}

export const MenuItemQueries = {
  menuItem: async (parent: any, { menu_item_id }: { menu_item_id: number }, context: any, info: any) => {
    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.getMenuItemById(menu_item_id)
    return data
  },
  menuItemsByOrganization: async (
    parent: any,
    { organization_id }: { organization_id: number },
    context: any,
    info: any
  ) => {
    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.getAllMenuItemsByOrganizationId(organization_id)
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

    const getOrganizationId = async ({ menu_id }: { menu_id: number }) => {
      try {
        const query = `SELECT organization_id
                      FROM "fm"."menus"
                      WHERE menu_id = $1`

        const params = [menu_id]
        const result = await db.query(query, params)

        return result.rows
      } catch (error) {
        console.log(error)
      }
    }

    const result = await getOrganizationId(args)

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
  removeMenuItem: async (parent: any, { menu_item_id }: { menu_item_id: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const menuItemRepository = new MenuItemRepository()
    const data = await menuItemRepository.deleteMenuItem(menu_item_id)
    return data
  },
}
