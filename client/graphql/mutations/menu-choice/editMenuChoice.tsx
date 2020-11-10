import { gql } from '@apollo/client'

export const EDIT_MENU_CHOICE = gql`
  mutation($menu_choice_id: ID!, $header: String, $sub_header: String) {
    editMenuChoice(
      menu_choice_id: $menu_choice_id
      header: $header
      sub_header: $sub_header
    ) {
      code
      message
      success
      menu_choice {
        menu_choice_id
        organization_id
        menu_item_id
        header
        sub_header
      }
    }
  }
`
