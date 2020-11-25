import { gql } from '@apollo/client'

export const MENU_SELECTION = gql`
  query($selectionId: ID!) {
    menuSelection(selectionId: $selectionId) {
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
