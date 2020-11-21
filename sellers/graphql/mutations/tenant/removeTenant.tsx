import { gql } from '@apollo/client'

export const REMOVE_TENANT = gql`
  mutation($tenant_id: ID!) {
    removeMenuSelection(tenant_id: $tenant_id) {
      code
      message
      success
      tenant {
        tenant_id
      }
    }
  }
`
