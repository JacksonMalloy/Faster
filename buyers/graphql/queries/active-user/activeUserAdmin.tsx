import { gql } from '@apollo/client'

export const ACTIVE_USER_ADMIN = gql`
  query {
    activeUserAdmin {
      admin_id
      tenant_id
      phone
      email
      name
      permissions
      created_at
      token
    }
  }
`
