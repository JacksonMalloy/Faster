import { gql } from '@apollo/client'

export const ADD_MENU_CHOICE = gql`
  mutation($tenantId: ID!, $header: String!, $description: String) {
    addMenuChoice(tenantId: $tenantId, header: $header, description: $description) {
      code
      message
      success
      menuChoice {
        choiceId
        tenantId
        header
        description
      }
    }
  }
`
