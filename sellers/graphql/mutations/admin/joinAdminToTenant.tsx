import { gql } from '@apollo/client'

export const JOIN_ADMIN_TO_TENANT = gql`
  mutation($adminId: ID!, $tenantId: ID!, $authToken: String!) {
    joinAdminToTenant(adminId: $adminId, tenantId: $tenantId, authToken: $authToken) {
      code
      message
      success
      connection {
        connect {
          tenantId
          adminId
        }
      }
    }
  }
`
