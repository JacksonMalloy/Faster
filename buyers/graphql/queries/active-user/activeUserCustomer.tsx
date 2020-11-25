import { gql } from '@apollo/client'

export const ACTIVE_USER_CUSTOMER = gql`
  query {
    activeUserCustomer {
      customerId
      phone
      email
      name
      permissions
      createdAt
      token
      tenants {
        name
        tenantId
      }
    }
  }
`
