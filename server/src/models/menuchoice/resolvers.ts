import MenuChoiceRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type CreateMenuChoiceArgs = {
  header: string
  sub_header: string
  tenant_id: number
}

type UpdateMenuChoiceArgs = {
  header: string
  sub_header: string
  choice_id: number
}

type ChoiceWithItemArgs = {
  item_id: number
  choice_ids: number[]
}

export const MenuChoiceQueries = {
  menuChoice: async (parent: any, { choice_id }: { choice_id: number }, context: any, info: any) => {
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.getMenuChoiceById(choice_id)
    return data
  },
  menuChoicesByTenant: async (
    parent: any,
    { tenant_id }: { tenant_id: number },
    context: any,
    info: any
  ) => {
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.getAllMenuChoicesByTenant(tenant_id)
    return data
  },
}

export const MenuChoiceMutations = {
  addMenuChoice: async (parent: any, args: CreateMenuChoiceArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.createMenuChoice(args)
    return data
  },
  editMenuChoice: async (parent: any, args: UpdateMenuChoiceArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.updateMenuChoice(args)
    return data
  },
  removeMenuChoice: async (parent: any, args: { choice_id: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.deleteMenuChoice(args)
    return data
  },
  connectMenuChoicesToMenuItem: async (
    parent: any,
    args: { item_id: number; choice_ids: number[] },
    context: any,
    info: any
  ) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.connectingMenuChoicesToMenuItem(args)
    return data
  },
  removeMenuChoicesMenuItemsConnection: async (
    parent: any,
    args: { item_id: number; choice_ids: number[] },
    context: any,
    info: any
  ) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.removingMenuChoicesMenuItemsConnection(args)
    return data
  },
}
