import MenuHeaderRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type CreateMenuHeaderArgs = {
  menu_id: number
  name: string
  sub_header: string
}

type UpdateMenuHeaderArgs = {
  header_id: number
  name: string
  sub_header: string
}

export const MenuHeaderQueries = {
  menuHeader: async (parent: any, { header_id }: { header_id: number }, context: any, info: any) => {
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeader = await menuHeaderRepository.getMenuHeaderById(header_id)
    return menuHeader
  },
  menuHeadersByMenu: async (parent: any, { menu_id }: { menu_id: number }, context: any, info: any) => {
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeaders = await menuHeaderRepository.getAllMenuHeadersByMenu(menu_id)
    return menuHeaders
  },
}

export const MenuHeaderMutations = {
  addMenuHeader: async (parent: any, args: CreateMenuHeaderArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeader = await menuHeaderRepository.createMenuHeader(args)
    return menuHeader
  },
  editMenuHeader: async (parent: any, args: UpdateMenuHeaderArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeader = await menuHeaderRepository.updateMenuHeader(args)
    return menuHeader
  },
  removeMenuHeader: async (parent: any, { header_id }: { header_id: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeader = await menuHeaderRepository.deleteMenuHeader(header_id)
    return menuHeader
  },
}
