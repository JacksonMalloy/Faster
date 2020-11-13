import { gql } from '@apollo/client'

export const CONNECT_MENU_CHOICES_TO_MENU_ITEM = gql`
  mutation($menu_item_id: ID!, $menu_choice_ids: [ID!]) {
    connectMenuChoicesToMenuItem(menu_item_id: $menu_item_id, menu_choice_ids: $menu_choice_ids) {
      code
      message
      success
      connection {
        connect {
          menu_item_id
          menu_choice_id
        }
      }
    }
  }
`
