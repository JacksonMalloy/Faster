import { gql } from '@apollo/client'

export const ORGANIZATION = gql`
  query($organization_id: ID!) {
    organization(organization_id: $organization_id) {
      name
      organization_id
      access_code
      admins {
        admin_id
        organization_id
        phone
        email
        name
        permissions
        created_at
      }
    }
  }
`
