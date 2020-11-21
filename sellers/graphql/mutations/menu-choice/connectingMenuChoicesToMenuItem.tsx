import { gql } from '@apollo/client'

export const CONNECT_MENU_CHOICES_TO_MENU_ITEM = gql`
  mutation($item_id: ID!, $choice_ids: [ID!]) {
    connectMenuChoicesToMenuItem(item_id: $item_id, choice_ids: $choice_ids) {
      code
      message
      success
      connection {
        connect {
          item_id
          choice_id
        }
      }
    }
  }
`
