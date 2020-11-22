import { gql } from '@apollo/client'

export const REMOVE_MENU_ITEM = gql`
  mutation($menu_item_id: ID!) {
    removeMenuItem(menu_item_id: $menu_item_id) {
      code
      success
      message
      menu_item {
        menu_item_id
      }
    }
  }
`
