import { gql } from '@apollo/client'

export const JOIN_ADMIN_TO_TENANT = gql`
  mutation($admin_id: ID!, $tenant_id: ID!, $auth_token: String!) {
    joinAdminToTenant(admin_id: $admin_id, tenant_id: $tenant_id, auth_token: $auth_token) {
      code
      message
      success
      connection {
        connect {
          tenant_id
          admin_id
        }
      }
    }
  }
`
