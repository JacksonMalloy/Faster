import { gql } from '@apollo/client'

export const EDIT_MENU = gql`
  mutation($menu_id: ID!, $title: String, $published: Boolean) {
    editMenu(menu_id: $menu_id, title: $title, published: $published) {
      code
      message
      success
      menu {
        menu_id
        tenant_id
        created_at
        updated_at
        published
        title
        image {
          image_url
        }
      }
    }
  }
`
