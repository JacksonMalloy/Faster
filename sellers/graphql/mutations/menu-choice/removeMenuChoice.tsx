import { gql } from '@apollo/client'

export const REMOVE_MENU_CHOICE = gql`
  mutation($choiceId: ID!) {
    removeMenuChoice(choiceId: $choiceId) {
      code
      message
      success
      menuChoice {
        choiceId
      }
    }
  }
`
