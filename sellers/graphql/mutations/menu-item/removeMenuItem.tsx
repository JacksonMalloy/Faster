import { gql } from '@apollo/client'

export const REMOVE_MENU_ITEM = gql`
  mutation($itemId: ID!) {
    deleteMenuItem(itemId: $itemId) {
      code
      success
      message
      menuItem {
        itemId
      }
    }
  }
`
