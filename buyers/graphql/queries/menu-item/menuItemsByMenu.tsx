import { gql } from '@apollo/client'

export const MENU_ITEMS_BY_MENU = gql`
  query($menu_id: ID!) {
    menuItemsByMenu(menu_id: $menu_id) {
      item_id
      menu_id
      base_price
      description
      name
      menu_header {
        header_id
        menu_id
        name
        sub_header
      }
    }
  }
`
