import { gql } from '@apollo/client'

export const REMOVE_ADMIN = gql`
  mutation($adminId: ID!) {
    removeAdmin(adminId: $adminId) {
      code
      message
      success
      admin {
        adminId
      }
    }
  }
`
