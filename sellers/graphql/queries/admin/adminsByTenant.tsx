import { gql } from '@apollo/client'

export const ADMINS_BY_TENANT = gql`
  query($tenantId: ID!) {
    adminsByTenant(tenantId: $tenantId) {
      adminId
      tenantId
      phone
      email
      name
      permissions
      # #createdAt
    }
  }
`
