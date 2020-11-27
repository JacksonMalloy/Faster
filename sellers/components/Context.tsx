import React, { FC, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
export interface State {
  tenantId: number | null
  menuId: number | null
  tenantToken: string | null
  selectedMenuName: string | null

  formHeader: any
  formAddOns: any
  formChoices: any
  formSelections: any
  formImage: any

  selectedMenu: any
  selectedItem: any
  selectedHeader: any
  selectedChoice: any
  selectedSelection: any

  displayToast: boolean
  formView: string
  secondaryFormView: string
}

const initialState = {
  tenantId: null,
  menuId: null,
  tenantToken: null,
  selectedMenuName: null,

  formHeader: null,
  formAddOns: [],
  formChoices: [],
  formSelections: [],
  formImage: null,

  selectedMenu: null,
  selectedItem: null,
  selectedHeader: null,
  selectedChoice: null,
  selectedSelection: null,

  displayToast: false,
  formView: 'CREATE_MENU_VIEW',
  secondaryFormView: '',
}

type FORM_VIEWS = 'CREATE_MENU_VIEW' | 'EDIT_MENU_VIEW' | 'CREATE_ITEM_VIEW' | 'EDIT_ITEM_VIEW'

type SECONDARY_FORM_VIEWS =
  | 'CREATE_CHOICE_VIEW'
  | 'EDIT_CHOICE_VIEW'
  | 'CREATE_SELECTION_VIEW'
  | 'EDIT_SELECTION_VIEW'
  | 'CREATE_HEADER_VIEW'
  | 'EDIT_HEADER_VIEW'

type TOAST_VARIANTS = 'WARNING' | 'ERROR' | 'SUCCESS'

type Action =
  | {
      type: 'OPEN_TOAST'
      message: string
      variant: TOAST_VARIANTS
    }
  | {
      type: 'CLOSE_TOAST'
    }
  | {
      type: 'SET_FORM_VIEW'
      view: FORM_VIEWS
    }
  | {
      type: 'SET_SECONDARY_FORM_VIEW'
      view: SECONDARY_FORM_VIEWS
    }
  | {
      type: 'SET_TENANT_ID'
      id: number
    }
  | {
      type: 'SET_TENANT_TOKEN'
      token: string
    }
  | {
      type: 'SET_UPLOADED_FORM_IMAGE'
      image: any
    }
  | {
      type: 'SET_SELECTED_MENU_NAME'
      name: string
    }
  | {
      type: 'SET_FORM_HEADER'
      header: any
    }
  | {
      type: 'SET_FORM_ADD_ONS'
      formAddOns: any
    }
  | {
      type: 'REMOVE_FORM_ADD_ON'
      UUID: string
    }
  | {
      type: 'SET_FORM_CHOICES'
      formChoices: any
    }
  | {
      type: 'REMOVE_FORM_CHOICE'
      UUID: string
      id: number
    }
  | {
      type: 'BULK_REMOVE_FORM_CHOICES'
      UUID: string
    }
  | {
      type: 'SET_FORM_SELECTIONS'
      formSelections: any
    }
  | {
      type: 'REMOVE_FORM_SELECTION'
      UUID: string
      id: number
    }
  | {
      type: 'BULK_REMOVE_FORM_SELECTIONS'
      UUID: string
    }
  | {
      type: 'RESET'
    }
  | {
      type: 'SET_SELECTED_MENU'
      menu: any
    }
  | {
      type: 'SET_SELECTED_ITEM'
      item: any
    }
  | {
      type: 'SET_SELECTED_HEADER'
      header: any
    }
  | {
      type: 'SET_SELECTED_CHOICE'
      choice: any
    }
  | {
      type: 'SET_SELECTED_SELECTION'
      selection: any
    }
  | {
      type: 'SET_MENU_ID'
      id: number
    }

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_TOAST': {
      return {
        ...state,
        displayToast: true,
      }
    }
    case 'CLOSE_TOAST': {
      return {
        ...state,
        displayToast: false,
      }
    }
    case 'SET_FORM_VIEW': {
      return {
        ...state,
        formView: action.view,
      }
    }
    case 'SET_SECONDARY_FORM_VIEW': {
      return {
        ...state,
        secondaryFormView: action.view,
      }
    }
    case 'SET_TENANT_ID': {
      return {
        ...state,
        tenantId: action.id,
      }
    }
    case 'SET_TENANT_TOKEN': {
      return {
        ...state,
        tenantToken: action.token,
      }
    }
    case 'SET_UPLOADED_FORM_IMAGE': {
      return {
        ...state,
        formImage: action.image,
      }
    }
    case 'SET_SELECTED_MENU_NAME': {
      return {
        ...state,
        selectedMenuName: action.name,
      }
    }
    // Form context state
    case 'SET_FORM_HEADER': {
      return {
        ...state,
        formHeader: action.header,
      }
    }
    case 'SET_FORM_ADD_ONS': {
      return {
        ...state,
        formAddOns: [...state.formAddOns, action.formAddOns],
      }
    }
    case 'REMOVE_FORM_ADD_ON': {
      return {
        ...state,
        formAddOns: state.formAddOns.filter((addOn: any) => addOn.UUID !== action.UUID),
      }
    }
    case 'SET_FORM_CHOICES': {
      return {
        ...state,
        formChoices: [
          ...state.formChoices.filter((choice: any) => choice.UUID !== action.formChoices.UUID),
          action.formChoices,
        ],
      }
    }
    case 'REMOVE_FORM_CHOICE': {
      return {
        ...state,
        formChoices: state.formChoices.filter((choice: any) => choice.UUID !== action.UUID),
      }
    }
    case 'BULK_REMOVE_FORM_CHOICES': {
      return {
        ...state,
        formChoices: state.formChoices.filter((choice: any) => choice.UUID !== action.UUID),
      }
    }
    case 'SET_FORM_SELECTIONS': {
      return {
        ...state,
        formSelections: [
          ...state.formSelections.filter((selection: any) => {
            return (
              selection.selectionId !== action.formSelections.selectionId ||
              selection.UUID !== action.formSelections.UUID
            )
          }),
          action.formSelections,
        ],
      }
    }
    case 'REMOVE_FORM_SELECTION': {
      return {
        ...state,
        formSelections: state.formSelections.filter((selection: any) => {
          return selection.selectionId !== action.id || selection.UUID !== action.UUID
        }),
      }
    }
    case 'BULK_REMOVE_FORM_SELECTIONS': {
      return {
        ...state,
        formSelections: state.formSelections.filter((selection: any) => selection.UUID !== action.UUID),
      }
    }
    case 'RESET': {
      return {
        ...state,
        formHeader: null,
        formAddOns: [],
        formChoices: [],
        formSelections: [],
        formImage: null,
        selectedMenu: null,
        // Otherwise itemSelection.header is undefined
        // selectedItem: null,
        selectedHeader: null,
        selectedChoice: null,
        selectedSelection: null,
      }
    }
    case 'SET_SELECTED_MENU': {
      return {
        ...state,
        selectedMenu: action.menu,
      }
    }
    case 'SET_SELECTED_ITEM': {
      return {
        ...state,
        selectedItem: action.item,
      }
    }
    case 'SET_SELECTED_HEADER': {
      return {
        ...state,
        selectedHeader: action.header,
      }
    }
    case 'SET_SELECTED_CHOICE': {
      return {
        ...state,
        selectedChoice: action.choice,
      }
    }
    case 'SET_SELECTED_SELECTION': {
      return {
        ...state,
        selectedSelection: action.selection,
      }
    }
    case 'SET_MENU_ID': {
      return {
        ...state,
        menuId: action.id,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const reset = () => dispatch({ type: 'RESET' })
  const setTenantId = (id: number) => dispatch({ type: 'SET_TENANT_ID', id })
  const setMenuId = (id: number) => dispatch({ type: 'SET_MENU_ID', id })
  const setTenantToken = (token: string) => dispatch({ type: 'SET_TENANT_TOKEN', token })
  const setSelectedMenuName = (name: string) => dispatch({ type: 'SET_SELECTED_MENU_NAME', name })
  const closeToast = () => dispatch({ type: 'CLOSE_TOAST' })
  const openToast = (message: string, variant: TOAST_VARIANTS) => dispatch({ type: 'OPEN_TOAST', message, variant })
  const setFormView = (view: FORM_VIEWS) => dispatch({ type: 'SET_FORM_VIEW', view })
  const setSecondaryFormView = (view: SECONDARY_FORM_VIEWS) => dispatch({ type: 'SET_SECONDARY_FORM_VIEW', view })

  const setFormHeader = (header: any) => dispatch({ type: 'SET_FORM_HEADER', header })
  const setFormImage = (image: any) => dispatch({ type: 'SET_UPLOADED_FORM_IMAGE', image })
  const setFormAddOns = (formAddOn: any) =>
    dispatch({ type: 'SET_FORM_ADD_ONS', formAddOns: { ...formAddOn, UUID: uuidv4() } })
  const removeFormAddOn = (UUID: string) => dispatch({ type: 'REMOVE_FORM_ADD_ON', UUID })
  const setFormChoices = (formChoice: any) => dispatch({ type: 'SET_FORM_CHOICES', formChoices: { ...formChoice } })
  const removeFormChoice = (id: number, UUID: string) => dispatch({ type: 'REMOVE_FORM_CHOICE', id, UUID })
  const bulkRemoveFormChoices = (UUID: string) => dispatch({ type: 'BULK_REMOVE_FORM_CHOICES', UUID })
  const setFormSelections = (formSelection: any) =>
    dispatch({ type: 'SET_FORM_SELECTIONS', formSelections: { ...formSelection } })
  const removeFormSelection = (id: number, UUID: string) => dispatch({ type: 'REMOVE_FORM_SELECTION', id, UUID })
  const bulkRemoveFormSelections = (UUID: string) => dispatch({ type: 'BULK_REMOVE_FORM_SELECTIONS', UUID })
  const setSelectedMenu = (menu: any) => dispatch({ type: 'SET_SELECTED_MENU', menu })
  const setSelectedItem = (item: any) => dispatch({ type: 'SET_SELECTED_ITEM', item })
  const setSelectedHeader = (header: any) => dispatch({ type: 'SET_SELECTED_HEADER', header })
  const setSelectedChoice = (choice: any) => dispatch({ type: 'SET_SELECTED_CHOICE', choice })
  const setSelectedSelection = (selection: any) => dispatch({ type: 'SET_SELECTED_SELECTION', selection })

  const value = useMemo(
    () => ({
      ...state,
      reset,
      setTenantId,
      setMenuId,
      setTenantToken,
      setSelectedMenuName,

      // ALERTS
      openToast,
      closeToast,

      setFormView,
      setSecondaryFormView,
      setFormImage,

      // HEADER
      setFormHeader,

      // ADD ONS
      setFormAddOns,
      removeFormAddOn,

      // CHOICES
      setFormChoices,
      removeFormChoice,
      bulkRemoveFormChoices,

      // SELECTIONS
      setFormSelections,
      removeFormSelection,
      bulkRemoveFormSelections,

      // EDITING FORMS
      setSelectedMenu,
      setSelectedItem,
      setSelectedHeader,
      setSelectedChoice,
      setSelectedSelection,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC = ({ children }) => <UIProvider>{children}</UIProvider>
