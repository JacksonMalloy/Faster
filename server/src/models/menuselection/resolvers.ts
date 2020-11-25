import MenuSelectionRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type CreateSelectionArgs = {
  tenantId: number
  itemId: number
  name: string
  valueAdd: string
}

type UpdateSelectionArgs = {
  tenantId: number
  selectionId: number
  itemId: number
  name: string
  valueAdd: string
}

type SelectionsWithChoice = {
  selectionIds: number[]
  choiceId: number
}

export const MenuSelectionQueries = {
  menuSelection: async (parent: any, { selectionId }: { selectionId: number }, context: any, info: any) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelection = await menuSelectionRepository.getMenuSelectionById(selectionId)
    return menuSelection
  },
  menuSelectionsByTenant: async (parent: any, { tenantId }: { tenantId: number }, context: any, info: any) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByTenant(tenantId)
    return menuSelections
  },
  menuSelectionsByMenuChoice: async (parent: any, { choiceId }: { choiceId: number }, context: any, info: any) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByMenuChoice(choiceId)
    return menuSelections
  },
  menuSelectionsByMenuItem: async (parent: any, { itemId }: { itemId: number }, context: any, info: any) => {
    const menuSelectionRepository = new MenuSelectionRepository()
    const menuSelections = await menuSelectionRepository.getMenuSelectionsByMenuItem(itemId)
    return menuSelections
  },
}

export const MenuSelectionMutations = {
  createMenuSelection: async (parent: any, args: CreateSelectionArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuSelectionRepository = new MenuSelectionRepository()
    const data = await menuSelectionRepository.createMenuSelection(args)
    return data
  },
  deleteMenuSelection: async (parent: any, { selectionId }: { selectionId: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const menuSelectionRepository = new MenuSelectionRepository()
    const data = await menuSelectionRepository.deleteMenuSelection(selectionId)
    return data
  },
  updateMenuSelection: async (parent: any, args: UpdateSelectionArgs, context: any, info: any) => {
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
