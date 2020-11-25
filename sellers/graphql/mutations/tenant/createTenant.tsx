import { gql } from '@apollo/client'

export const CREATE_TENANT = gql`
  mutation(
    $address: String!
    $city: String!
    $countryRegion: String!
    $name: String!
    $phone: String
    $websiteUrl: String
    $postalCode: String!
    $subAddress: String
    $province: String!
  ) {
    createTenant(
      address: $address
      city: $city
      countryRegion: $countryRegion
      name: $name
      phone: $phone
      websiteUrl: $websiteUrl
      postalCode: $postalCode
      subAddress: $subAddress
      province: $province
    ) {
      code
      success
      message
      tenant {
        name
        tenantId
        address
        city
        countryRegion
        name
        phone
        websiteUrl
        postalCode
        subAddress
        province
        authToken
      }
    }
  }
`
