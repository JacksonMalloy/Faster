import { gql } from '@apollo/client'

export const SEARCH_MENU_ITEMS = gql`
  query($menu_id: ID!, $search_query: String) {
    searchMenuItems(menu_id: $menu_id, search_query: $search_query) {
      menu_item_id
      menu_id
      base_price
      description
      name
      menu_header {
        menu_header_id
        menu_id
        name
        sub_header
      }
    }
  }
`
