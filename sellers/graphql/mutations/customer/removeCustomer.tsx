import { gql } from '@apollo/client'

export const REMOVE_CUSTOMER = gql`
  mutation(customer_id: ID!) {
    removeCustomer(customer_id: $customer_id) {
      code
      success
      message
      customer {
        customer_id
      }
    }
  }
`
