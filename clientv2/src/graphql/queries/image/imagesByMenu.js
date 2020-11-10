import { gql } from '@apollo/client'

export const IMAGES_BY_MENU = gql`
  query($menu_id: ID!) {
    imagesByMenu(menu_id: $menu_id) {
      uploaded_at
      image_id
      image_url
      menu_item_id
      menu_id
      organization_id
    }
  }
`
