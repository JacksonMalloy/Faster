import { gql } from '@apollo/client'

export const CONNECT_MENU_SELECTIONS_TO_MENU_CHOICES = gql`
  mutation($menu_choice_id: ID!, $menu_selection_ids: [ID!]) {
    connectMenuSelectionsToMenuChoice(
      menu_choice_id: $menu_choice_id
      menu_selection_ids: $menu_selection_ids
    ) {
      code
      message
      success
      connection {
        connect {
          menu_choice_id
          menu_selection_id
        }
      }
    }
  }
`
