import { gql } from '@apollo/client'

export const IMAGE_BY_MENU_ITEM = gql`
  query($menu_item_id: ID!) {
    imageByMenuItem(menu_item_id: $menu_item_id) {
      uploaded_at
      image_id
      image_url
      menu_item_id
      menu_id
      organization_id
    }
  }
`
