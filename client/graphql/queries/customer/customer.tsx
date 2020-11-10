import { gql } from '@apollo/client'

export const CUSTOMER = gql`
  query($customer_id: ID!) {
    customer(customer_id: $customer_id) {
      customer_id
      phone
      email
      name
      permissions
      created_at
      table_id
      token
      organizations {
        name
        organization_id
      }
    }
  }
`
