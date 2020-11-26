import { gql } from '@apollo/client'

export const REMOVE_MENU_SELECTION = gql`
  mutation($selectionId: ID!) {
    deleteMenuSelection(selectionId: $selectionId) {
      code
      message
      success
    }
  }
`
