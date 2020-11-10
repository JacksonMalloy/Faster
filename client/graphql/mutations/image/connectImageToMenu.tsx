import { gql } from '@apollo/client'

export const CONNECT_IMAGE_TO_MENU = gql`
  mutation($image_id: ID!, $menu_id: ID!) {
    connectImageToMenu(image_id: $image_id, menu_id: $menu_id) {
      code
      message
      success
      connection {
        connect {
          image_id
          menu_id
        }
      }
    }
  }
`
