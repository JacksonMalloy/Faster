import { v4 as uuidv4 } from 'uuid'

export const UPDATE_USER_ID = 'UPDATE_USER_ID'
export const UPDATE_ALERTS = 'UPDATE_ALERTS'
export const ADD_ALERT = 'ADD_ALERT'
export const READ_ALERT = 'READ_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
export const UPDATE_TOKEN = `UPDATE_TOKEN`

export const ADD_HEADER = `ADD_HEADER`

export const ADD_CHOICE_GROUP = `ADD_CHOICE_GROUP`
export const REMOVE_CHOICE_GROUP = `REMOVE_CHOICE_GROUP`

export const BULK_REMOVE_CHOICES = `BULK_REMOVE_CHOICES`
export const BULK_REMOVE_SELECTIONS = `BULK_REMOVE_SELECTIONS`

export const ADD_CHOICE = `ADD_CHOICE`
export const REMOVE_CHOICE = `REMOVE_CHOICE`

export const ADD_SELECTION = `ADD_SELECTION`
export const REMOVE_SELECTION = `REMOVE_SELECTION`

export const UPDATE_FORM_PHASE = `UPDATE_FORM_PHASE`

export const ADD_IMAGE = `ADD_IMAGE`

export const RESET = `RESET`

export const ADD_ORDER_SELECTION = `ADD_ORDER_SELECTION`
export const REMOVE_ORDER_SELECTION = `REMOVE_ORDER_SELECTION`

export const updateUserId = (userId) => {
  return {
    type: UPDATE_USER_ID,
    userId,
  }
}

export const updateToken = (token) => {
  return {
    type: UPDATE_TOKEN,
    token,
  }
}

export const updateAlerts = (alerts) => {
  return {
    type: UPDATE_ALERTS,
    alerts,
  }
}

export const addAlert = (alert, read = false) => {
  return {
    type: ADD_ALERT,
    alert: { ...alert, id: uuidv4(), read },
  }
}

export const readAlert = (alert) => {
  return {
    type: READ_ALERT,
    alert: { ...alert, read: true },
  }
}

export const removeAlert = (alert) => {
  return {
    type: REMOVE_ALERT,
    alert,
  }
}

/////////////////////////////////
// MENU ITEM FORM GLOBAL STATE //
/////////////////////////////////

// HEADERS
export const addHeader = (header) => {
  return {
    type: ADD_HEADER,
    header: { ...header },
  }
}

// export const removeHeader = (header) => {
//   return {
//     type: REMOVE_HEADER,
//     header,
//   }
// }

// CHOICE GROUPS
export const addChoiceGroup = (choice, read = false) => {
  return {
    type: ADD_CHOICE_GROUP,
    choice: { ...choice, id: uuidv4(), read },
  }
}

export const removeChoiceGroup = (choice) => {
  return {
    type: REMOVE_CHOICE_GROUP,
    choice,
  }
}

// MENU CHOICES SELECTED
export const addChoice = (choice, id) => {
  return {
    type: ADD_CHOICE,
    choice: { ...choice, id },
  }
}

export const removeChoice = (choice) => {
  return {
    type: REMOVE_CHOICE,
    choice,
  }
}

export const bulkRemoveChoices = (id) => {
  return {
    type: BULK_REMOVE_CHOICES,
    id,
  }
}

export const bulkRemoveSelections = (id) => {
  return {
    type: BULK_REMOVE_SELECTIONS,
    id,
  }
}

// MENU SELECTIONS SELECTED
export const addSelection = (selection, id) => {
  return {
    type: ADD_SELECTION,
    selection: { ...selection, id },
    id,
  }
}

export const removeSelection = (selection, id) => {
  return {
    type: REMOVE_SELECTION,
    selection: { ...selection, id },
    id,
  }
}

// FORM PHASE
export const updateFormPhase = (phase) => {
  console.log(`PHASE: `, phase)

  return {
    type: UPDATE_FORM_PHASE,
    phase,
  }
}

// IMAGE
export const addImage = (image) => {
  console.log(`IMAGE: `, image)

  return {
    type: ADD_IMAGE,
    image,
  }
}

// RESET
export const reset = () => {
  return {
    type: RESET,
  }
}

// ORDER SELECTIONS SELECTED
export const addOrderSelection = (orderSelection, id, choice) => {
  return {
    type: ADD_ORDER_SELECTION,
    orderSelection: { ...orderSelection },
    choice,
    id,
  }
}

export const removeOrderSelection = (orderSelection, id, choice) => {
  return {
    type: REMOVE_ORDER_SELECTION,
    orderSelection: { ...orderSelection },
    choice,
    id,
  }
}
