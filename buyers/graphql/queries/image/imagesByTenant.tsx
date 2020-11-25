import { gql } from '@apollo/client'

export const IMAGES_BY_TENANT = gql`
  query($tenantId: ID!) {
    imagesByTenant(tenantId: $tenantId) {
      uploadedAt
      imageId
      imageUrl
      itemId
      menuId
      tenantId
    }
  }
`
