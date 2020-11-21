import { gql } from '@apollo/client'

export const ADMINS_BY_TENANT = gql`
  query($tenant_id: ID!) {
    adminsByTenant(tenant_id: $tenant_id) {
      admin_id
      tenant_id
      phone
      email
      name
      permissions
      created_at
    }
  }
`
