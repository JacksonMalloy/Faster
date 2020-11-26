import { gql } from '@apollo/client'

export const EDIT_MENU_HEADER = gql`
  mutation($headerId: ID!, $menuId: ID, $name: String, $description: String) {
    updateMenuHeader(headerId: $headerId, menuId: $menuId, name: $name, description: $description) {
      code
      success
      message
      menuHeader {
        headerId
        menuId
        name
        description
      }
    }
  }
`
