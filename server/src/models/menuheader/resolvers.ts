import MenuHeaderRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type CreateMenuHeaderArgs = {
  menuId: number
  name: string
  description: string
}

type UpdateMenuHeaderArgs = {
  headerId: number
  name: string
  description: string
}

export const MenuHeaderQueries = {
  menuHeader: async (parent: any, { headerId }: { headerId: number }, context: any, info: any) => {
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeader = await menuHeaderRepository.getMenuHeaderById(headerId)
    return menuHeader
  },
  menuHeadersByMenu: async (parent: any, { menuId }: { menuId: number }, context: any, info: any) => {
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeaders = await menuHeaderRepository.getAllMenuHeadersByMenu(menuId)
    return menuHeaders
  },
}

export const MenuHeaderMutations = {
  createMenuHeader: async (parent: any, args: CreateMenuHeaderArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeader = await menuHeaderRepository.createMenuHeader(args)
    return menuHeader
  },
  updateMenuHeader: async (parent: any, args: UpdateMenuHeaderArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeader = await menuHeaderRepository.updateMenuHeader(args)
    return menuHeader
  },
  deleteMenuHeader: async (parent: any, { headerId }: { headerId: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuHeaderRepository = new MenuHeaderRepository()
    const menuHeader = await menuHeaderRepository.deleteMenuHeader(headerId)
    return menuHeader
  },
}
