import { gql } from '@apollo/client'

export const CUSTOMERS_BY_TENANT = gql`
  query($tenant_id: ID!) {
    customersByTenant(tenant_id: $tenant_id) {
      customer_id
      phone
      email
      name
      permissions
      created_at
      table_id
    }
  }
`
