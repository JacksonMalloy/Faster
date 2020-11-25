import { gql } from '@apollo/client'

export const CONNECT_IMAGE_TO_MENU = gql`
  mutation($imageId: ID!, $menuId: ID!) {
    connectImageToMenu(imageId: $imageId, menuId: $menuId) {
      code
      message
      success
      connection {
        connect {
          imageId
          menuId
        }
      }
    }
  }
`
