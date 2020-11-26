import { gql } from '@apollo/client'

export const EDIT_MENU_CHOICE = gql`
  mutation($choiceId: ID!, $header: String, $description: String) {
    updateMenuChoice(choiceId: $choiceId, header: $header, description: $description) {
      code
      message
      success
      menuChoice {
        choiceId
        tenantId
        itemId
        header
        description
      }
    }
  }
`
