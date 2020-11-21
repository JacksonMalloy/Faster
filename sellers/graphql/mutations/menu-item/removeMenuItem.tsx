import { gql } from '@apollo/client'

export const REMOVE_MENU_ITEM = gql`
  mutation($item_id: ID!) {
    removeMenuItem(item_id: $item_id) {
      code
      success
      message
      menu_item {
        item_id
      }
    }
  }
`
