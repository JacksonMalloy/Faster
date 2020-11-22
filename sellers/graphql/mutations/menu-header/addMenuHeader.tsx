import { gql } from '@apollo/client'

export const ADD_MENU_HEADER = gql`
  mutation($menu_id: ID!, $name: String!, $sub_header: String) {
    addMenuHeader(menu_id: $menu_id, name: $name, sub_header: $sub_header) {
      code
      success
      menu_header {
        menu_header_id
        menu_id
        name
        sub_header
      }
    }
  }
`
