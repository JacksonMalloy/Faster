import { gql } from '@apollo/client'

export const MENU_ITEMS_BY_MENU = gql`
  query($menuId: ID!) {
    menuItemsByMenu(menuId: $menuId) {
      itemId
      menuId
      basePrice
      description
      name
      menuHeader {
        headerId
        menuId
        name
        description
      }
    }
  }
`
