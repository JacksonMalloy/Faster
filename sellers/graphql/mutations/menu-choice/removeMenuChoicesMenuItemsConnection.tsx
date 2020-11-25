import { gql } from '@apollo/client'

export const REMOVE_MENU_CHOICES_MENU_ITEMS_CONNECTION = gql`
  mutation($itemId: ID!, $choiceIds: [ID!]) {
    removeMenuChoicesMenuItemsConnection(itemId: $itemId, choiceIds: $choiceIds) {
      code
      success
      message
      connection {
        connect {
          itemId
          choiceId
        }
      }
    }
  }
`
