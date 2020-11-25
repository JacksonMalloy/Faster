import { gql } from '@apollo/client'

export const MENU_ITEM = gql`
  query($itemId: ID!) {
    menuItem(itemId: $itemId) {
      itemId
      menuId
      basePrice
      description
      name
      image {
        uploadedAt
        imageId
        imageUrl
        itemId
        menuId
        tenantId
      }
      menuHeader {
        headerId
        menuId
        name
        description
      }
      menuChoices {
        choiceId
        itemId
        header
        description
        selections {
          tenantId
          selectionId
          choiceId
          itemId
          name
          valueAdd
          selected
        }
      }
    }
  }
`
