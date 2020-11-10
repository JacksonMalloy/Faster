// Does not return any values
import { gql } from '@apollo/client'

export const DELETE_IMAGE = gql`
  mutation($image_id: ID!) {
    deleteImage(image_id: $image_id) {
      image_id
    }
  }
`
