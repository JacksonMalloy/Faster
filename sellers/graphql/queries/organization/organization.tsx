import { gql } from '@apollo/client'

export const ORGANIZATION = gql`
  query($organization_id: ID!) {
    organization(organization_id: $organization_id) {
      organization_id
      name
      address
      city
      access_code
      country_region
      phone
      website_url
      postal_code
      sub_address
      province
      auth_token
      admins {
        admin_id
        name
        email
        phone
      }
      directors {
        admin_id
        name
        email
        phone
      }
    }
  }
`
