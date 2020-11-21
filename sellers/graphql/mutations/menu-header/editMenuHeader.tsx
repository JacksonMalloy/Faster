import { gql } from '@apollo/client'

export const EDIT_MENU_HEADER = gql`
  mutation($header_id: ID!, $menu_id: ID, $name: String, $sub_header: String) {
    editMenuHeader(header_id: $header_id, menu_id: $menu_id, name: $name, sub_header: $sub_header) {
      code
      success
      message
      menu_header {
        header_id
        menu_id
        name
        sub_header
      }
    }
  }
`
