import { gql } from '@apollo/client'

export const ADD_MENU_CHOICE = gql`
  mutation($tenant_id: ID!, $header: String!, $sub_header: String) {
    addMenuChoice(tenant_id: $tenant_id, header: $header, sub_header: $sub_header) {
      code
      message
      success
      menu_choice {
        choice_id
        tenant_id
        header
        sub_header
      }
    }
  }
`
