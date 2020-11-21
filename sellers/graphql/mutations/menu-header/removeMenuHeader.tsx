import { gql } from '@apollo/client'

export const REMOVE_MENU_HEADER = gql`
  mutation($header_id: ID!) {
    removeMenuHeader(header_id: $header_id) {
      code
      success
      message
      menu_header {
        header_id
      }
    }
  }
`
