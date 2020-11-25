import { gql } from '@apollo/client'

export const CUSTOMER = gql`
  query($customerId: ID!) {
    customer(customerId: $customerId) {
      customerId
      phone
      email
      name
      permissions
      createdAt
      table_id
      token
      tenants {
        name
        tenantId
      }
    }
  }
`
