import { gql } from '@apollo/client'

export const MENU_SELECTIONS_BY_MENU_ITEM = gql`
  query($itemId: ID!) {
    menuSelectionsByMenuItem(itemId: $itemId) {
      tenantId
      selectionId
      choiceId
      itemId
      name
      valueAdd
      selected
    }
  }
`
