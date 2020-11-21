import { gql } from '@apollo/client'

export const MENU_HEADER = gql`
  query($header_id: ID!) {
    menuHeader(header_id: $header_id) {
      header_id
      menu_id
      name
      sub_header
      menu_items {
        header_id
        item_id
        menu_id
        name
        sub_header
        selected
      }
    }
  }
`
