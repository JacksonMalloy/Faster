import { gql } from '@apollo/client'

export const CONNECT_IMAGE_TO_MENU_ITEM = gql`
  mutation($imageId: ID!, $itemId: ID!) {
    connectImageToMenuItem(imageId: $imageId, itemId: $itemId) {
      imageId
      itemId
    }
  }
`
