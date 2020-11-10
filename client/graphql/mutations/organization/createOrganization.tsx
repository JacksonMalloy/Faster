import { gql } from '@apollo/client'

export const CREATE_ORGANIZATION = gql`
  mutation(
    $address: String!
    $city: String!
    $country_region: String!
    $name: String!
    $phone: String
    $website_url: String
    $postal_code: String!
    $sub_address: String
    $province: String!
  ) {
    createOrganization(
      address: $address
      city: $city
      country_region: $country_region
      name: $name
      phone: $phone
      website_url: $website_url
      postal_code: $postal_code
      sub_address: $sub_address
      province: $province
    ) {
      code
      success
      message
      organization {
        name
        organization_id
        address
        city
        country_region
        name
        phone
        website_url
        postal_code
        sub_address
        province
        auth_token
      }
    }
  }
`
