import MenuSelectionRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type CreateSelectionArgs = {
  tenant_id: number
  item_id: number
  name: string
  value_add: string
}

type UpdateSelectionArgs = {
  tenant_id: number
  selection_id: number
  item_id: number
  name: string
  value_add: string
}

type SelectionsWithChoice = {
  selection_ids: number[]
  choice_id: number
}

export const MenuSelectionQueries = {
  menuSelection: async (parent: any, { selection_id }: { selection_id: number }, context: any, info: any) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelection = await menuSelectionRepository.getMenuSelectionById(selection_id)
    return menuSelection
  },
  menuSelectionsByTenant: async (
    parent: any,
    { tenant_id }: { tenant_id: number },
    context: any,
    info: any
  ) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByTenant(tenant_id)
    return menuSelections
  },
  menuSelectionsByMenuChoice: async (
    parent: any,
    { choice_id }: { choice_id: number },
    context: any,
    info: any
  ) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByMenuChoice(choice_id)
    return menuSelections
  },
  menuSelectionsByMenuItem: async (
    parent: any,
    { item_id }: { item_id: number },
    context: any,
    info: any
  ) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByMenuItem(item_id)
    return menuSelections
  },
}

export const MenuSelectionMutations = {
  addMenuSelection: async (parent: any, args: CreateSelectionArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuSelectionRepository = new MenuSelectionRepository()
    const data = await menuSelectionRepository.createMenuSelection(args)
    return data
  },
  removeMenuSelection: async (
    parent: any,
    { selection_id }: { selection_id: number },
    context: any,
    info: any
  ) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuSelectionRepository = new MenuSelectionRepository()
    const data = await menuSelectionRepository.deleteMenuSelection(selection_id)
    return data
  },
  editMenuSelection: async (parent: any, args: UpdateSelectionArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuSelectionRepository = new MenuSelectionRepository()
    const data = await menuSelectionRepository.updateMenuSelection(args)
    return data
  },
  connectMenuSelectionsToMenuChoice: async (parent: any, args: SelectionsWithChoice, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuSelectionRepository = new MenuSelectionRepository()
    const data = await menuSelectionRepository.connectingMenuSelectionToMenuChoice(args)
    return data
  },
  removeMenuSelectionsMenuChoicesConnection: async (
    parent: any,
    args: SelectionsWithChoice,
    context: any,
    info: any
  ) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuSelectionRepository = new MenuSelectionRepository()
    const data = await menuSelectionRepository.removingMenuSelectionsMenuChoicesConnection(args)
    return data
  },
}
