import { gql } from '@apollo/client'

export const ADD_MENU_ITEM = gql`
  mutation($menuId: ID!, $name: String!, $basePrice: String!, $description: String!, $headerId: ID) {
    addMenuItem(menuId: $menuId, name: $name, basePrice: $basePrice, description: $description, headerId: $headerId) {
      code
      success
      message
      menuItem {
        itemId
        menuId
        headerId
        basePrice
        description
        name
      }
    }
  }
`
