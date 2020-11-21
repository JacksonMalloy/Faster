import { gql } from '@apollo/client'

export const EDIT_MENU_CHOICE = gql`
  mutation($choice_id: ID!, $header: String, $sub_header: String) {
    editMenuChoice(choice_id: $choice_id, header: $header, sub_header: $sub_header) {
      code
      message
      success
      menu_choice {
        choice_id
        tenant_id
        item_id
        header
        sub_header
      }
    }
  }
`
