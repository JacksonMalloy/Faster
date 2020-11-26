import { gql } from '@apollo/client'

export const REMOVE_MENU_CHOICE = gql`
  mutation($choiceId: ID!) {
    deleteMenuChoice(choiceId: $choiceId) {
      code
      message
      success
    }
  }
`
