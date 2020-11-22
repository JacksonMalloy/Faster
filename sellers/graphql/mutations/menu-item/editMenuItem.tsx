import { gql } from '@apollo/client'

export const EDIT_MENU_ITEM = gql`
  mutation(
    $menu_item_id: ID!
    $menu_id: ID!
    $name: String
    $base_price: String
    $description: String
    $menu_header_id: ID
  ) {
    editMenuItem(
      menu_item_id: $menu_item_id
      menu_id: $menu_id
      name: $name
      base_price: $base_price
      description: $description
      menu_header_id: $menu_header_id
    ) {
      code
      message
      success
      menu_item {
        menu_item_id
        menu_header_id
        menu_id
        base_price
        description
        name
        menu_choices {
          menu_choice_id
          selections {
            menu_selection_id
          }
        }
      }
    }
  }
`
