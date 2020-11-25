import { gql } from '@apollo/client'

export const REMOVE_MENU_HEADER = gql`
  mutation($headerId: ID!) {
    removeMenuHeader(headerId: $headerId) {
      code
      success
      message
      menuHeader {
        headerId
      }
    }
  }
`
