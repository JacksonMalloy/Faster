import { gql } from '@apollo/client'

export const IMAGE_BY_MENU_ITEM = gql`
  query($itemId: ID!) {
    imageByMenuItem(itemId: $itemId) {
      uploadedAt
      imageId
      imageUrl
      itemId
      menuId
      tenantId
    }
  }
`
