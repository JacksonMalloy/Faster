import { gql } from '@apollo/client'

export const ACTIVE_USER_ADMIN = gql`
  query {
    activeUserAdmin {
      adminId
      tenantId
      phone
      email
      name
      permissions
      # passing timestampz through API can cause weird bugs
      # #createdAt
      token
    }
  }
`
