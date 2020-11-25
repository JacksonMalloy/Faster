import MenuRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

export const MenuQueries = {
  menu: async (parent: any, { menuId }: { menuId: number }, context: any, info: any) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getMenuById(menuId)
    return data
  },
  menusByTenant: async (parent: any, { tenantId }: { tenantId: number }, context: any, info: any) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getAllMenusByTenant(tenantId)
    return data
  },
  searchMenus: async (
    parent: any,
    { tenantId, searchQuery }: { tenantId: number; searchQuery: string },
    context: any,
    info: any
  ) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getAllMenusByTenant(tenantId)

    const searchData = data.filter((data) => data.title.toLowerCase().includes(searchQuery.toLowerCase()))

    return searchData
  },
}

type CreateMenuArgs = {
  tenantId: number
  title: string
}

type UpdateMenuArgs = {
  menuId: number
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
  removeMenu: async (parent: any, args: { menuId: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuRepo = new MenuRepository()
    const data = await menuRepo.deleteMenu(args)
    return data
  },
}
