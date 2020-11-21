import { gql } from '@apollo/client'

export const ADMIN = gql`
  query($admin_id: ID!) {
    admin(admin_id: $admin_id) {
      admin_id
      tenant_id
      phone
      email
      name
      permissions
      created_at
      token
    }
  }
`
