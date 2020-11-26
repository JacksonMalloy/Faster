import { gql } from '@apollo/client'

export const REMOVE_CUSTOMER = gql`
  mutation(customerId: ID!) {
    deleteCustomer(customerId: $customerId) {
      code
      success
      message
      customer {
        customerId
      }
    }
  }
`
