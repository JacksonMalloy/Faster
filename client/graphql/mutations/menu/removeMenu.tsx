import { gql } from '@apollo/client'

export const REMOVE_MENU = gql`
  mutation($menu_id: ID!) {
    removeMenu(menu_id: $menu_id) {
      code
      message
      success
      menu {
        menu_id
      }
    }
  }
`
