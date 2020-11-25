import { gql } from '@apollo/client'

export const SEARCH_MENU_ITEMS = gql`
  query($menuId: ID!, $searchQuery: String) {
    searchMenuItems(menuId: $menuId, searchQuery: $searchQuery) {
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
