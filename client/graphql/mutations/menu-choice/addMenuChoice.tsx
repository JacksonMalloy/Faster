import { gql } from '@apollo/client'

export const ADD_MENU_CHOICE = gql`
  mutation($organization_id: ID!, $header: String!, $sub_header: String) {
    addMenuChoice(organization_id: $organization_id, header: $header, sub_header: $sub_header) {
      code
      message
      success
      menu_choice {
        menu_choice_id
        organization_id
        header
        sub_header
      }
    }
  }
`
