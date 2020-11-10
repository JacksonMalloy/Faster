import { gql } from '@apollo/client'

export const JOIN_ADMIN_TO_ORGANIZATION = gql`
  mutation($admin_id: ID!, $organization_id: ID!, $auth_token: String!) {
    joinAdminToOrganization(
      admin_id: $admin_id
      organization_id: $organization_id
      auth_token: $auth_token
    ) {
      code
      message
      success
      connection {
        connect {
          organization_id
          admin_id
        }
      }
    }
  }
`
