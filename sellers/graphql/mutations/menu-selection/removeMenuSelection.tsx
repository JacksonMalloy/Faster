import { gql } from '@apollo/client'

export const REMOVE_MENU_SELECTION = gql`
  mutation($selection_id: ID!) {
    removeMenuSelection(selection_id: $selection_id) {
      code
      message
      success
      menu_selection {
        selection_id
      }
    }
  }
`
