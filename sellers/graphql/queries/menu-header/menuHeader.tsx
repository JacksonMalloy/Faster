import { gql } from '@apollo/client'

export const MENU_HEADER = gql`
  query($headerId: ID!) {
    menuHeader(headerId: $headerId) {
      headerId
      menuId
      name
      description
      menuItems {
        headerId
        itemId
        menuId
        name
        description
        selected
      }
    }
  }
`
