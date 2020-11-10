import { gql } from '@apollo/client'

export const EDIT_MENU_HEADER = gql`
  mutation(
    $menu_header_id: ID!
    $menu_id: ID
    $menu_item_id: ID!
    $name: String
    $sub_header: String
  ) {
    editMenuHeader(
      menu_header_id: $menu_header_id
      menu_item_id: $menu_item_id
      menu_id: $menu_id
      name: $name
      sub_header: $sub_header
    ) {
      code
      success
      message
      menu_header {
        menu_header_id
        menu_item_id
        menu_id
        name
        sub_header
      }
    }
  }
`
