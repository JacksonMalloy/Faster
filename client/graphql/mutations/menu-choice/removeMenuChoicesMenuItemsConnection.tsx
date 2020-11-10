import { gql } from '@apollo/client'

export const REMOVE_MENU_CHOICES_MENU_ITEMS_CONNECTION = gql`
  mutation($menu_item_id: ID!, $menu_choice_ids: [ID!]) {
    removeMenuChoicesMenuItemsConnection(
      menu_item_id: $menu_item_id
      menu_choice_ids: $menu_choice_ids
    ) {
      code
      success
      message
      connection {
        connect {
          menu_item_id
          menu_choice_id
        }
      }
    }
  }
`
