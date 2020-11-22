import { gql } from '@apollo/client'

export const IMAGE = gql`
  query($image_id: ID!) {
    imageById(image_id: $image_id) {
      uploaded_at
      image_id
      image_url
      menu_item_id
      menu_id
      organization_id
    }
  }
`
