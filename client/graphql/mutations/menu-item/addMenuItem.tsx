import { gql } from '@apollo/client'

export const ADD_MENU_ITEM = gql`
  mutation($menu_id: ID!, $name: String!, $base_price: String!, $description: String!, $menu_header_id: ID) {
    addMenuItem(
      menu_id: $menu_id
      name: $name
      base_price: $base_price
      description: $description
      menu_header_id: $menu_header_id
    ) {
      code
      success
      message
      menu_item {
        menu_item_id
        menu_id
        menu_header_id
        base_price
        description
        name
      }
    }
  }
`
