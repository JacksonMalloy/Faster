import { gql } from '@apollo/client'

export const REMOVE_MENU_SELECTIONS_MENU_CHOICES_CONNECTION = gql`
  mutation($choiceId: ID!, $selectionIds: [ID!]) {
    removeMenuSelectionsMenuChoicesConnection(choiceId: $choiceId, selectionIds: $selectionIds) {
      code
      success
      message
      connection {
        connect {
          choiceId
          selectionId
        }
      }
    }
  }
`
