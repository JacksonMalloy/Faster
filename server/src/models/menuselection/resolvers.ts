import MenuSelectionRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type CreateSelectionArgs = {
  organization_id: number
  menu_item_id: number
  name: string
  value_add: string
}

type UpdateSelectionArgs = {
  organization_id: number
  menu_selection_id: number
  menu_item_id: number
  name: string
  value_add: string
}

type SelectionsWithChoice = {
  menu_selection_ids: number[]
  menu_choice_id: number
}

export const MenuSelectionQueries = {
  menuSelection: async (parent: any, { menu_selection_id }: { menu_selection_id: number }, context: any, info: any) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelection = await menuSelectionRepository.getMenuSelectionById(menu_selection_id)
    return menuSelection
  },
  menuSelectionsByOrganization: async (
    parent: any,
    { organization_id }: { organization_id: number },
    context: any,
    info: any
  ) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByOrganization(organization_id)
    return menuSelections
  },
  menuSelectionsByMenuChoice: async (
    parent: any,
    { menu_choice_id }: { menu_choice_id: number },
    context: any,
    info: any
  ) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByMenuChoice(menu_choice_id)
    return menuSelections
  },
  menuSelectionsByMenuItem: async (
    parent: any,
    { menu_item_id }: { menu_item_id: number },
    context: any,
    info: any
  ) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByMenuItem(menu_item_id)
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
    { menu_selection_id }: { menu_selection_id: number },
    context: any,
    info: any
  ) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuSelectionRepository = new MenuSelectionRepository()
    const data = await menuSelectionRepository.deleteMenuSelection(menu_selection_id)
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
