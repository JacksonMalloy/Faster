import { gql } from '@apollo/client'

export const ACTIVE_USER_CUSTOMER = gql`
  query {
    activeUserCustomer {
      customer_id
      phone
      email
      name
      permissions
      created_at
      token
      tenants {
        name
        tenant_id
      }
    }
  }
`
