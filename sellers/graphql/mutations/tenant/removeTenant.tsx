import { gql } from '@apollo/client'

export const REMOVE_TENANT = gql`
  mutation($tenantId: ID!) {
    deleteMenuSelection(tenantId: $tenantId) {
      code
      message
      success
      tenant {
        tenantId
      }
    }
  }
`
