import { gql } from '@apollo/client'

export const MENU_HEADERS_BY_MENU = gql`
  query($menuId: ID!) {
    menuHeadersByMenu(menuId: $menuId) {
      headerId
      menuId
      name
      description
    }
  }
`
