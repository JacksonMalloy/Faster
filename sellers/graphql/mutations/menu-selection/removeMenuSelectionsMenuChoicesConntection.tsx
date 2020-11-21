import { gql } from '@apollo/client'

export const REMOVE_MENU_SELECTIONS_MENU_CHOICES_CONNECTION = gql`
  mutation($choice_id: ID!, $selection_ids: [ID!]) {
    removeMenuSelectionsMenuChoicesConnection(choice_id: $choice_id, selection_ids: $selection_ids) {
      code
      success
      message
      connection {
        connect {
          choice_id
          selection_id
        }
      }
    }
  }
`
