import { gql } from '@apollo/client'

export const JOIN_CUSTOMER_TO_TENANT = gql`
  mutation(customerId: ID!, tenantId: ID!) {
    connectCustomerToTenant(customerId: $customerId, tenantId: $tenantId) {
      code
      message
      success
      connection {
        connect {
          customerId
          tenantId
        }
      }
    }
  }
`
