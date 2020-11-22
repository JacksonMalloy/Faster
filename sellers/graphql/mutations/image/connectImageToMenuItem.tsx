import { gql } from '@apollo/client'

export const CONNECT_IMAGE_TO_MENU_ITEM = gql`
  mutation($image_id: ID!, $menu_item_id: ID!) {
    connectImageToMenuItem(image_id: $image_id, menu_item_id: $menu_item_id) {
      image_id
      menu_item_id
    }
  }
`
