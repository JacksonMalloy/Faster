import { gql } from '@apollo/client'

export const CUSTOMERS_BY_TENANT = gql`
  query($tenantId: ID!) {
    customersByTenant(tenantId: $tenantId) {
      customerId
      phone
      email
      name
      permissions
      # #createdAt
      table_id
    }
  }
`
