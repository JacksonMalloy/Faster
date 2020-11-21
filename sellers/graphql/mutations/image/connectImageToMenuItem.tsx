import { gql } from '@apollo/client'

export const CONNECT_IMAGE_TO_MENU_ITEM = gql`
  mutation($image_id: ID!, $item_id: ID!) {
    connectImageToMenuItem(image_id: $image_id, item_id: $item_id) {
      image_id
      item_id
    }
  }
`
