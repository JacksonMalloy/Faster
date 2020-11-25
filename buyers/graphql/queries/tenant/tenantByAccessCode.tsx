import { gql } from '@apollo/client'

export const TENANT_BY_ACCESS_CODE = gql`
  query($accessCode: String!) {
    tenantByAccessCode(accessCode: $accessCode) {
      name
      tenantId
      address
      city
      accessCode
      countryRegion
      phone
      websiteUrl
      postalCode
      subAddress
      province
      menus {
        menuId
        title
        createdAt
        tenantId
        published
        image {
          imageUrl
        }
      }
    }
  }
`
