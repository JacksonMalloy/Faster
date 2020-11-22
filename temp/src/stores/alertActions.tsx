import { addAlert } from './userActions'

// MENUS
export const menuDeleted = () => {
  return addAlert({
    type: 'MENU_DELETED',
    message: `Menu Deleted`,
    variant: `red`,
  })
}

export const menuCreated = () => {
  return addAlert({
    type: 'MENU_CREATED',
    message: `Menu Created`,
    variant: `green`,
  })
}

export const menuUpdated = () => {
  return addAlert({
    type: 'MENU_UPDATED',
    message: `Menu Updated`,
    variant: `green`,
  })
}

export const menuPublished = () => {
  return addAlert({
    type: 'MENU_PUBLISHED',
    message: `Menu Published`,
    variant: `green`,
  })
}

// ITEMS
export const itemDeleted = () => {
  return addAlert({
    type: 'ITEM_DELETED',
    message: `Item Deleted`,
    variant: `red`,
  })
}

export const itemCreated = () => {
  return addAlert({
    type: 'ITEM_CREATED',
    message: `Item Created`,
    variant: `green`,
  })
}

export const itemUpdated = () => {
  return addAlert({
    type: 'ITEM_UPDATED',
    message: `Item Updated`,
    variant: `green`,
  })
}

// HEADERS
export const headerDeleted = () => {
  return addAlert({
    type: 'HEADER_DELETED',
    message: `Header Deleted`,
    variant: `red`,
  })
}

export const headerCreated = () => {
  return addAlert({
    type: 'HEADER_CREATED',
    message: `Header Created`,
    variant: `green`,
  })
}

export const headerUpdated = () => {
  return addAlert({
    type: 'HEADER_UPDATED',
    message: `Header Updated`,
    variant: `green`,
  })
}

// SELECTIONS
export const selectionDeleted = () => {
  return addAlert({
    type: 'SELECTION_DELETED',
    message: `Selection Deleted`,
    variant: `red`,
  })
}

export const selectionCreated = () => {
  return addAlert({
    type: 'SELECTION_CREATED',
    message: `Selection Created`,
    variant: `green`,
  })
}

export const selectionUpdated = () => {
  return addAlert({
    type: 'SELECTION_UPDATED',
    message: `Selection Updated`,
    variant: `green`,
  })
}
