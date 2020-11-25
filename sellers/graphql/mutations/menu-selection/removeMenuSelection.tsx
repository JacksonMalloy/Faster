import { gql } from '@apollo/client'

export const REMOVE_MENU_SELECTION = gql`
  mutation($selectionId: ID!) {
    removeMenuSelection(selectionId: $selectionId) {
      code
      message
      success
      menuSelection {
        selectionId
      }
    }
  }
`
