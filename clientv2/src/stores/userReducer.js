import {
  UPDATE_USER_ID,
  ADD_ALERT,
  READ_ALERT,
  REMOVE_ALERT,
  ADD_CHOICE_GROUP,
  REMOVE_CHOICE_GROUP,
  BULK_REMOVE_CHOICES,
  BULK_REMOVE_SELECTIONS,
  ADD_HEADER,
  ADD_CHOICE,
  REMOVE_CHOICE,
  ADD_SELECTION,
  REMOVE_SELECTION,
  UPDATE_TOKEN,
  UPDATE_FORM_PHASE,
  ADD_IMAGE,
  RESET,
  ADD_ORDER_SELECTION,
  REMOVE_ORDER_SELECTION,
} from './userActions'

import { itemDeleter } from '../utils/itemDeleter'

export const initialUserState = {
  userId: '',
  alerts: [],
  token: '',
  // Maybe not have as array?
  header: [],
  choiceGroups: [],
  choices: [],
  selections: [],
  orderSelections: [],
  formPhase: 'menu-item',
  image: '',
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USER_ID:
      const { userId } = action
      localStorage.setItem('userId', userId)
      return {
        ...state,
        userId,
      }
    case UPDATE_TOKEN:
      const { token } = action
      localStorage.setItem('auth_token', token)
      return {
        ...state,
        token,
      }
    case ADD_ALERT:
      const alertToAdd = action.alert
      return {
        ...state,
        alerts: [...state.alerts, alertToAdd],
      }
    case READ_ALERT:
      const alertToRead = action.alert
      return {
        ...state,
        alerts: state.alerts.map((alert) => (alert.id === alertToRead.id ? alertToRead : alert)),
      }
    case REMOVE_ALERT:
      const alertToRemove = action.alert
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== alertToRemove.id),
      }

    // HEADERS
    case ADD_HEADER:
      const headerToAdd = action.header
      return {
        ...state,
        header: [headerToAdd],
      }

    // CHOICE GROUPS
    case ADD_CHOICE_GROUP:
      const groupToAdd = action.choice
      return {
        ...state,
        choiceGroups: [...state.choiceGroups, groupToAdd],
      }

    case REMOVE_CHOICE_GROUP:
      const groupToRemove = action.choice
      return {
        ...state,
        choiceGroups: state.choiceGroups.filter((group) => group.id !== groupToRemove.id),
      }

    // CHOICES
    case ADD_CHOICE:
      const choiceToAdd = action.choice

      const choices = state.choices.filter((choice) => choice.id !== choiceToAdd.id)

      return {
        ...state,
        choices: [...choices, choiceToAdd],
      }

    case REMOVE_CHOICE:
      const choiceToRemove = action.choice
      return {
        ...state,
        choices: state.choices.filter((choice) => choice.menu_choice_id !== choiceToRemove.menu_choice_id),
      }
    case BULK_REMOVE_CHOICES:
      const groupToBulkRemove = action.id

      return {
        ...state,
        choices: state.choices.filter((choice) => choice.id !== groupToBulkRemove),
      }
    case BULK_REMOVE_SELECTIONS:
      const groupSelectionsToBulkRemove = action.id

      return {
        ...state,
        selections: state.selections.filter((selection) => selection.id !== groupSelectionsToBulkRemove),
      }

    // SELECTIONS
    case ADD_SELECTION:
      const selectionToAdd = action.selection
      return {
        ...state,
        selections: [...state.selections, selectionToAdd],
      }

    case REMOVE_SELECTION:
      const selectionToRemove = action.selection
      const choiceGroupId = action.id

      const itemRemoved = state.selections.filter(
        (selection) =>
          selection.menu_selection_id === selectionToRemove.menu_selection_id && selection.id === choiceGroupId
      )

      return {
        ...state,
        selections: itemDeleter(state.selections, itemRemoved),
      }

    // Form Phase
    case UPDATE_FORM_PHASE:
      const newPhase = action.phase
      return {
        ...state,
        formPhase: newPhase,
      }

    // IMAGES
    case ADD_IMAGE:
      const imageToAdd = action.image
      return {
        ...state,
        image: imageToAdd,
      }

    case RESET:
      return {
        ...state,
        header: [],
        choiceGroups: [],
        choices: [],
        selections: [],
        image: '',
      }

    // ORDERS
    case ADD_ORDER_SELECTION:
      const orderSelectionToAdd = action.orderSelection
      const choiceType = action.choice.sub_header
      const choiceID = action.choice.menu_choice_id

      console.log({ orderSelectionToAdd })

      const handleChoiceType = (choiceType) => {
        switch (choiceType) {
          case 'Choose One':
            console.log(`Choosing One`)
            const orderSelections = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id !== orderSelectionToAdd.menu_choice_id
            )

            return [...orderSelections, orderSelectionToAdd]

          case 'Choose Exactly 2':
          case 'Choose up to two':
          case 'Choose two':
            console.log(`Choose exactly two`)

            const minTwoFilteredByID = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id === choiceID
            )

            let restOfFilteredArrayTwo = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id !== choiceID
            )

            const minTwo = minTwoFilteredByID.length === 2 ? minTwoFilteredByID.splice(-1, 1) : minTwoFilteredByID

            return [...minTwo, ...restOfFilteredArrayTwo, orderSelectionToAdd]

          case 'Choose exactly three':
          case 'Choose up to three':
          case 'Choose three':
            console.log(`Choose exactly three`)

            const minThreeFilteredByID = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id === choiceID
            )

            let restOfFilteredArrayThree = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id !== choiceID
            )

            const minThree =
              minThreeFilteredByID.length === 3 ? minThreeFilteredByID.splice(-1, 1) : minThreeFilteredByID

            return [...minThree, ...restOfFilteredArrayThree, orderSelectionToAdd]
          case 'Choose exactly four':
          case 'Choose four':
          case 'Choose up to four':
            console.log(`Choose exactly four`)

            const minFourFilteredByID = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id === choiceID
            )

            let restOfFilteredArrayFour = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id !== choiceID
            )

            const minFour = minFourFilteredByID.length === 4 ? minFourFilteredByID.splice(-1, 1) : minFourFilteredByID

            return [...minFour, ...restOfFilteredArrayFour, orderSelectionToAdd]

          case 'Choose exactly five':
            console.log(`Choose exactly five`)

            const minFiveFilteredByID = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id === choiceID
            )

            let restOfFilteredArrayFive = state.orderSelections.filter(
              (orderSelection) => orderSelection.menu_choice_id !== choiceID
            )

            const minFive = minFiveFilteredByID.length === 5 ? minFiveFilteredByID.splice(-1, 1) : minFiveFilteredByID

            return [...minFive, ...restOfFilteredArrayFive, orderSelectionToAdd]

          case 'Choose as many as you would like':
            console.log(`Choose as many as you'd like`)
            return [...state.orderSelections, orderSelectionToAdd]
          case 'Choose at least two':
            console.log(`Choose at least two`)

            return [...state.orderSelections, orderSelectionToAdd]
          case 'Choose at least three':
            console.log(`Choose at least three`)

            return [...state.orderSelections, orderSelectionToAdd]
          case 'Choose at least four':
            console.log(`Choose at least four`)

            return [...state.orderSelections, orderSelectionToAdd]

          default:
            break
        }
      }

      return {
        ...state,
        orderSelections: handleChoiceType(choiceType),
      }

    case REMOVE_ORDER_SELECTION:
      const orderSelectionToRemove = action.orderSelection
      const menuChoiceId = action.id

      const orderSelectionRemoved = state.orderSelections.filter(
        (orderSelection) =>
          orderSelection.menu_selection_id === orderSelectionToRemove.menu_selection_id &&
          orderSelection.menu_choice_id === menuChoiceId
      )

      return {
        ...state,
        orderSelections: itemDeleter(state.orderSelections, orderSelectionRemoved),
      }

    default: {
      console.error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
