import MenuRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

export const MenuQueries = {
  menu: async (parent: any, { menu_id }: { menu_id: number }, context: any, info: any) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getMenuById(menu_id)
    return data
  },
  menusByTenant: async (
    parent: any,
    { tenant_id }: { tenant_id: number },
    context: any,
    info: any
  ) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getAllMenusByTenant(tenant_id)
    return data
  },
  searchMenus: async (
    parent: any,
    { tenant_id, search_query }: { tenant_id: number; search_query: string },
    context: any,
    info: any
  ) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getAllMenusByTenant(tenant_id)

    const searchData = data.filter((data) => data.title.toLowerCase().includes(search_query.toLowerCase()))

    return searchData
  },
}

type CreateMenuArgs = {
  tenant_id: number
  title: string
}

type UpdateMenuArgs = {
  menu_id: number
  title: number
  published: boolean
}

export const MenuMutations = {
  addMenu: async (parent: any, args: CreateMenuArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuRepo = new MenuRepository()
    const data = await menuRepo.createMenu(args)
    return data
  },
  editMenu: async (parent: any, args: UpdateMenuArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuRepo = new MenuRepository()
    const data = await menuRepo.updateMenu(args)
    return data
  },
  removeMenu: async (parent: any, args: { menu_id: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuRepo = new MenuRepository()
    const data = await menuRepo.deleteMenu(args)
    return data
  },
}
