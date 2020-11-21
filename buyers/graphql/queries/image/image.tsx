import { gql } from '@apollo/client'

export const IMAGE = gql`
  query($image_id: ID!) {
    imageById(image_id: $image_id) {
      uploaded_at
      image_id
      image_url
      item_id
      menu_id
      tenant_id
    }
  }
`
