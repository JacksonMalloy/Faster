import { gql } from '@apollo/client'

export const IMAGE = gql`
  query($imageId: ID!) {
    imageById(imageId: $imageId) {
      uploadedAt
      imageId
      imageUrl
      itemId
      menuId
      tenantId
    }
  }
`
