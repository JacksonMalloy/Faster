import { gql } from '@apollo/client'

export const TENANT = gql`
  query($tenant_id: ID!) {
    tenant(tenant_id: $tenant_id) {
      tenant_id
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
