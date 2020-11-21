import { gql } from '@apollo/client'

export const JOIN_CUSTOMER_TO_TENANT = gql`
  mutation(customer_id: ID!, tenant_id: ID!) {
    joinCustomerToTenant(customer_id: $customer_id, tenant_id: $tenant_id) {
      code
      message
      success
      connection {
        connect {
          customer_id
          tenant_id
        }
      }
    }
  }
`
