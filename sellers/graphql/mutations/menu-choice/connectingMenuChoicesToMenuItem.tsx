import { gql } from '@apollo/client'

export const CONNECT_MENU_CHOICES_TO_MENU_ITEM = gql`
  mutation($itemId: ID!, $choiceIds: [ID!]) {
    connectMenuChoicesToMenuItem(itemId: $itemId, choiceIds: $choiceIds) {
      code
      message
      success
      connection {
        connect {
          itemId
          choiceId
        }
      }
    }
  }
`
