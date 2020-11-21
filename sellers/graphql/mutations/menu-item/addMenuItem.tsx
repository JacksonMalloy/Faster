import { gql } from '@apollo/client'

export const ADD_MENU_ITEM = gql`
  mutation($menu_id: ID!, $name: String!, $base_price: String!, $description: String!, $header_id: ID) {
    addMenuItem(
      menu_id: $menu_id
      name: $name
      base_price: $base_price
      description: $description
      header_id: $header_id
    ) {
      code
      success
      message
      menu_item {
        item_id
        menu_id
        header_id
        base_price
        description
        name
      }
    }
  }
`
