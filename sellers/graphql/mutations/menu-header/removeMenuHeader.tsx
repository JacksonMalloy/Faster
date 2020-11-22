import { gql } from '@apollo/client'

export const REMOVE_MENU_HEADER = gql`
  mutation($menu_header_id: ID!) {
    removeMenuHeader(menu_header_id: $menu_header_id) {
      code
      success
      message
      menu_header {
        menu_header_id
      }
    }
  }
`
