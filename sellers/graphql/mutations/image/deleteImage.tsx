// Does not return any values
import { gql } from '@apollo/client'

export const DELETE_IMAGE = gql`
  mutation($imageId: ID!) {
    deleteImage(imageId: $imageId) {
      imageId
    }
  }
`
