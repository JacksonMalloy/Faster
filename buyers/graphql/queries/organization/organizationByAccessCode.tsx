import { gql } from '@apollo/client'

export const ORGANIZATION_BY_ACCESS_CODE = gql`
  query($access_code: String!) {
    organizationByAccessCode(access_code: $access_code) {
      name
      organization_id
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
        organization_id
        published
        image {
          image_url
        }
      }
    }
  }
`
