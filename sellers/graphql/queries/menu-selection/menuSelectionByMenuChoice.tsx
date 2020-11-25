import { gql } from '@apollo/client'

export const MENU_SELECTIONS_BY_MENU_CHOICE = gql`
  query($choiceId: ID!) {
    menuSelectionsByMenuChoice(choiceId: $choiceId) {
      tenantId
      selectionId
      choiceId
      itemId
      name
      valueAdd
      selected
    }
  }
`
