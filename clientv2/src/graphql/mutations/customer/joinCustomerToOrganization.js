import { gql } from '@apollo/client'

export const JOIN_CUSTOMER_TO_ORGANIZATION = gql`
  mutation(customer_id: ID!, organization_id: ID!) {
    joinCustomerToOrganization(customer_id: $customer_id, organization_id: $organization_id) {
      code
      message
      success
      connection {
        connect {
          customer_id
          organization_id
        }
      }
    }
  }
`
