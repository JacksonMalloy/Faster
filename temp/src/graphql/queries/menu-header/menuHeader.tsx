import { gql } from '@apollo/client'

export const MENU_HEADER = gql`
  query($menu_header_id: ID!) {
    menuHeader(menu_header_id: $menu_header_id) {
      menu_header_id
      menu_id
      name
      sub_header
      menu_items {
        menu_header_id
        menu_item_id
        menu_id
        name
        sub_header
        selected
      }
    }
  }
`
