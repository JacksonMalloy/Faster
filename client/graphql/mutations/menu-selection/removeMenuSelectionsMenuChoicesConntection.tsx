import { gql } from '@apollo/client'

export const REMOVE_MENU_SELECTIONS_MENU_CHOICES_CONNECTION = gql`
  mutation($menu_choice_id: ID!, $menu_selection_ids: [ID!]) {
    removeMenuSelectionsMenuChoicesConnection(
      menu_choice_id: $menu_choice_id
      menu_selection_ids: $menu_selection_ids
    ) {
      code
      success
      message
      connection {
        connect {
          menu_choice_id
          menu_selection_id
        }
      }
    }
  }
`
