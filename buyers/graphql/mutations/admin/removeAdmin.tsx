import { gql } from '@apollo/client'

export const REMOVE_ADMIN = gql`
  mutation($admin_id: ID!) {
    removeAdmin(admin_id: $admin_id) {
      code
      message
      success
      admin {
        admin_id
      }
    }
  }
`
