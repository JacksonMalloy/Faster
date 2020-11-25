import { gql } from '@apollo/client'

export const MENU_CHOICE = gql`
  query($choiceId: ID!) {
    menuChoice(choiceId: $choiceId) {
      choiceId
      tenantId
      itemId
      header
      description
    }
  }
`
