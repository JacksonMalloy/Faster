import { gql } from '@apollo/client'

export const REMOVE_MENU_CHOICE = gql`
  mutation($choice_id: ID!) {
    removeMenuChoice(choice_id: $choice_id) {
      code
      message
      success
      menu_choice {
        choice_id
      }
    }
  }
`
