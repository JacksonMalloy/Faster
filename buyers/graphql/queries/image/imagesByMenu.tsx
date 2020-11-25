import { gql } from '@apollo/client'

export const IMAGES_BY_MENU = gql`
  query($menuId: ID!) {
    imagesByMenu(menuId: $menuId) {
      uploadedAt
      imageId
      imageUrl
      itemId
      menuId
      tenantId
    }
  }
`
