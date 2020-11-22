import { gql } from '@apollo/client'

export const REMOVE_MENU_SELECTION = gql`
  mutation($menu_selection_id: ID!) {
    removeMenuSelection(menu_selection_id: $menu_selection_id) {
      code
      message
      success
      menu_selection {
        menu_selection_id
      }
    }
  }
`
