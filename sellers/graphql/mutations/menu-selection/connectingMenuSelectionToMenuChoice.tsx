import { gql } from '@apollo/client'

export const CONNECT_MENU_SELECTIONS_TO_MENU_CHOICES = gql`
  mutation($choiceId: ID!, $selectionIds: [ID!]) {
    connectMenuSelectionsToMenuChoice(choiceId: $choiceId, selectionIds: $selectionIds) {
      code
      message
      success
      connection {
        connect {
          choiceId
          selectionId
        }
      }
    }
  }
`
