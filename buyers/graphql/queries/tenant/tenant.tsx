import { gql } from '@apollo/client'

export const TENANT = gql`
  query($tenantId: ID!) {
    tenant(tenantId: $tenantId) {
      name
      tenantId
      accessCode
      admins {
        adminId
        tenantId
        phone
        email
        name
        permissions
        createdAt
      }
    }
  }
`
