import { gql } from '@apollo/client'

export const CONNECT_MENU_SELECTIONS_TO_MENU_CHOICES = gql`
  mutation($choice_id: ID!, $selection_ids: [ID!]) {
    connectMenuSelectionsToMenuChoice(choice_id: $choice_id, selection_ids: $selection_ids) {
      code
      message
      success
      connection {
        connect {
          choice_id
          selection_id
        }
      }
    }
  }
`
