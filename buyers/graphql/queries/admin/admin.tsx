import { gql } from '@apollo/client'

export const ADMIN = gql`
  query($adminId: ID!) {
    admin(adminId: $adminId) {
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
