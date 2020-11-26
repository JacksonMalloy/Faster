import { gql } from '@apollo/client'

export const ADD_MENU_HEADER = gql`
  mutation($menuId: ID!, $name: String!, $description: String) {
    createMenuHeader(menuId: $menuId, name: $name, description: $description) {
      code
      success
      menuHeader {
        headerId
        menuId
        name
        description
      }
    }
  }
`
