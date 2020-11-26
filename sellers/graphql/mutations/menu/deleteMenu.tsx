import { gql } from '@apollo/client'

export const REMOVE_MENU = gql`
  mutation($menuId: ID!) {
    deleteMenu(menuId: $menuId) {
      code
      message
      success
    }
  }
`
