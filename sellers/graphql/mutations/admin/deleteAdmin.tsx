import { gql } from '@apollo/client'

export const REMOVE_ADMIN = gql`
  mutation($adminId: ID!) {
    deleteAdmin(adminId: $adminId) {
      code
      message
      success
    }
  }
`
