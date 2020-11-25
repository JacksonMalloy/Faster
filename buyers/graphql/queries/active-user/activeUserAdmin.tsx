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
      createdAt
      token
    }
  }
`
