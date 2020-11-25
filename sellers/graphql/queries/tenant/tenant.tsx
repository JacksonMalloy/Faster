import { gql } from '@apollo/client'

export const TENANT = gql`
  query($tenantId: ID!) {
    tenant(tenantId: $tenantId) {
      tenantId
      name
      address
      city
      accessCode
      countryRegion
      phone
      websiteUrl
      postalCode
      subAddress
      province
      authToken
      admins {
        adminId
        name
        email
        phone
      }
      directors {
        adminId
        name
        email
        phone
      }
    }
  }
`
