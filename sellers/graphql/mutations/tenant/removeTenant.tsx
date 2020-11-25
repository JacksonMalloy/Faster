import { gql } from '@apollo/client'

export const REMOVE_TENANT = gql`
  mutation($tenantId: ID!) {
    removeMenuSelection(tenantId: $tenantId) {
      code
      message
      success
      tenant {
        tenantId
      }
    }
  }
`
