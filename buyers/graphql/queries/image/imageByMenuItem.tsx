import { gql } from '@apollo/client'

export const IMAGE_BY_MENU_ITEM = gql`
  query($item_id: ID!) {
    imageByMenuItem(item_id: $item_id) {
      uploaded_at
      image_id
      image_url
      item_id
      menu_id
      tenant_id
    }
  }
`
