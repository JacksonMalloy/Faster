import { gql } from '@apollo/client'

export const MENU = gql`
  query($menuId: ID!) {
    menu(menuId: $menuId) {
      menuId
      tenantId
      createdAt
      updatedAt
      published
      title
      image {
        uploadedAt
        imageId
        imageUrl
        itemId
        menuId
        tenantId
        __typename
      }
      menuItems {
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
        }
        menuHeader {
          headerId
          menuId
          name
          description
        }
        menuChoices {
          choiceId
          tenantId
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
  }
`
