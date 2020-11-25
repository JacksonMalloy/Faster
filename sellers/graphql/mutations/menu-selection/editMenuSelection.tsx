import { gql } from '@apollo/client'

export const EDIT_MENU_SELECTION = gql`
  mutation($selectionId: ID!, $name: String, $valueAdd: String) {
    updateMenuSelection(selectionId: $selectionId, name: $name, valueAdd: $valueAdd) {
      code
      success
      message
      menuSelection {
        tenantId
        selectionId
        choiceId
        itemId
        name
        valueAdd
      }
    }
  }
`
