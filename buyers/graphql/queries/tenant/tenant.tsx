import { gql } from '@apollo/client'

export const TENANT = gql`
  query($tenant_id: ID!) {
    tenant(tenant_id: $tenant_id) {
      name
      tenant_id
      access_code
      admins {
        admin_id
        tenant_id
        phone
        email
        name
        permissions
        created_at
      }
    }
  }
`
