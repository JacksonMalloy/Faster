import MenuChoiceRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type CreateMenuChoiceArgs = {
  header: string
  sub_header: string
  organization_id: number
}

type UpdateMenuChoiceArgs = {
  header: string
  sub_header: string
  menu_choice_id: number
}

type ChoiceWithItemArgs = {
  menu_item_id: number
  menu_choice_ids: number[]
}

export const MenuChoiceQueries = {
  menuChoice: async (parent: any, { menu_choice_id }: { menu_choice_id: number }, context: any, info: any) => {
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.getMenuChoiceById(menu_choice_id)
    return data
  },
  menuChoicesByOrganization: async (
    parent: any,
    { organization_id }: { organization_id: number },
    context: any,
    info: any
  ) => {
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.getAllMenuChoicesByOrganization(organization_id)
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
  removeMenuChoice: async (parent: any, args: { menu_choice_id: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.deleteMenuChoice(args)
    return data
  },
  connectMenuChoicesToMenuItem: async (
    parent: any,
    args: { menu_item_id: number; menu_choice_ids: number[] },
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
    args: { menu_item_id: number; menu_choice_ids: number[] },
    context: any,
    info: any
  ) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.removingMenuChoicesMenuItemsConnection(args)
    return data
  },
}
