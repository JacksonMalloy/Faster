import { gql } from '@apollo/client'

export const REMOVE_MENU = gql`
  mutation($menuId: ID!) {
    removeMenu(menuId: $menuId) {
      code
      message
      success
      menu {
        menuId
      }
    }
  }
`
