import MenuRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

export const MenuQueries = {
  menu: async (parent: any, { menu_id }: { menu_id: number }, context: any, info: any) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getMenuById(menu_id)
    return data
  },
  menusByOrganization: async (
    parent: any,
    { organization_id }: { organization_id: number },
    context: any,
    info: any
  ) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getAllMenusByOrganization(organization_id)
    return data
  },
  searchMenus: async (
    parent: any,
    { organization_id, search_query }: { organization_id: number; search_query: string },
    context: any,
    info: any
  ) => {
    const menuRepo = new MenuRepository()
    const data = await menuRepo.getAllMenusByOrganization(organization_id)

    const searchData = data.filter((data) => data.title.toLowerCase().includes(search_query.toLowerCase()))

    return searchData
  },
}

type CreateMenuArgs = {
  organization_id: number
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
