import { gql } from '@apollo/client'

export const EDIT_MENU = gql`
  mutation($menuId: ID!, $title: String, $published: Boolean) {
    editMenu(menuId: $menuId, title: $title, published: $published) {
      code
      message
      success
      menu {
        menuId
        tenantId
        createdAt
        updatedAt
        published
        title
        image {
          imageUrl
        }
      }
    }
  }
`
