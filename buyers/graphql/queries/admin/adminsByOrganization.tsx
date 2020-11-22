import { gql } from '@apollo/client'

export const ADMINS_BY_ORGANIZATION = gql`
  query($organization_id: ID!) {
    adminsByOrganization(organization_id: $organization_id) {
      admin_id
      organization_id
      phone
      email
      name
      permissions
      created_at
    }
  }
`
