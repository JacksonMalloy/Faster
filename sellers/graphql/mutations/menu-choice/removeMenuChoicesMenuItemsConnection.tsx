import { gql } from '@apollo/client'

export const REMOVE_MENU_CHOICES_MENU_ITEMS_CONNECTION = gql`
  mutation($item_id: ID!, $choice_ids: [ID!]) {
    removeMenuChoicesMenuItemsConnection(item_id: $item_id, choice_ids: $choice_ids) {
      code
      success
      message
      connection {
        connect {
          item_id
          choice_id
        }
      }
    }
  }
`
