import { gql } from '@apollo/client'

export const UPLOAD_IMAGE = gql`
  mutation($file: Upload!, $tenantId: ID!, $tenantName: String!) {
    uploadImage(file: $file, tenantId: $tenantId, tenantName: $tenantName) {
      code
      message
      success
      image {
        imageId
        tenantId
        imageUrl
        itemId
        menuId
        uploadedAt
      }
    }
  }
`
