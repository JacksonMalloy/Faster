import { gql } from '@apollo/client'

export const TENANT_BY_ACCESS_CODE = gql`
  query($access_code: String!) {
    tenantByAccessCode(access_code: $access_code) {
      name
      tenant_id
      address
      city
      access_code
      country_region
      phone
      website_url
      postal_code
      sub_address
      province
      menus {
        menu_id
        title
        created_at
        tenant_id
        published
        image {
          image_url
        }
      }
    }
  }
`
