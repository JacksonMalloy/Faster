import { gql } from '@apollo/client'

export const MENU_HEADERS_BY_MENU = gql`
  query($menu_id: ID!) {
    menuHeadersByMenu(menu_id: $menu_id) {
      header_id
      menu_id
      name
      sub_header
    }
  }
`
