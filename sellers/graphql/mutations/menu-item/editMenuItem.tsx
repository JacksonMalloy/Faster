import { gql } from '@apollo/client'

export const EDIT_MENU_ITEM = gql`
  mutation($item_id: ID!, $menu_id: ID!, $name: String, $base_price: String, $description: String, $header_id: ID) {
    editMenuItem(
      item_id: $item_id
      menu_id: $menu_id
      name: $name
      base_price: $base_price
      description: $description
      header_id: $header_id
    ) {
      code
      message
      success
      menu_item {
        item_id
        header_id
        menu_id
        base_price
        description
        name
        menu_choices {
          choice_id
          selections {
            selection_id
          }
        }
      }
    }
  }
`
