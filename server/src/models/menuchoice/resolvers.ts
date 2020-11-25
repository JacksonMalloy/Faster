import MenuChoiceRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type CreateMenuChoiceArgs = {
  header: string
  description: string
  tenantId: number
}

type UpdateMenuChoiceArgs = {
  header: string
  description: string
  choiceId: number
}

type ChoiceWithItemArgs = {
  itemId: number
  choiceIds: number[]
}

export const MenuChoiceQueries = {
  menuChoice: async (parent: any, { choiceId }: { choiceId: number }, context: any, info: any) => {
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.getMenuChoiceById(choiceId)
    return data
  },
  menuChoicesByTenant: async (parent: any, { tenantId }: { tenantId: number }, context: any, info: any) => {
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.getAllMenuChoicesByTenant(tenantId)
    return data
  },
}

export const MenuChoiceMutations = {
  createMenuChoice: async (parent: any, args: CreateMenuChoiceArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.createMenuChoice(args)
    return data
  },
  updateMenuChoice: async (parent: any, args: UpdateMenuChoiceArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.updateMenuChoice(args)
    return data
  },
  deleteMenuChoice: async (parent: any, args: { choiceId: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.deleteMenuChoice(args)
    return data
  },
  connectMenuChoicesToMenuItem: async (
    parent: any,
    args: { itemId: number; choiceIds: number[] },
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
    args: { itemId: number; choiceIds: number[] },
    context: any,
    info: any
  ) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuChoiceRepository = new MenuChoiceRepository()
    const data = await menuChoiceRepository.removingMenuChoicesMenuItemsConnection(args)
    return data
  },
}
