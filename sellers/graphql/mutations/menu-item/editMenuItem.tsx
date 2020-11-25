import { gql } from '@apollo/client'

export const EDIT_MENU_ITEM = gql`
  mutation($itemId: ID!, $menuId: ID!, $name: String, $basePrice: String, $description: String, $headerId: ID) {
    updateMenuItem(
      itemId: $itemId
      menuId: $menuId
      name: $name
      basePrice: $basePrice
      description: $description
      headerId: $headerId
    ) {
      code
      message
      success
      menuItem {
        itemId
        headerId
        menuId
        basePrice
        description
        name
        menuChoices {
          choiceId
          selections {
            selectionId
          }
        }
      }
    }
  }
`
