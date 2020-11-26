import { gql } from '@apollo/client'

export const ADD_MENU_SELECTION = gql`
  mutation($tenantId: ID!, $name: String!, $valueAdd: String) {
    createMenuSelection(tenantId: $tenantId, name: $name, valueAdd: $valueAdd) {
      code
      success
      message
      menuSelection {
        tenantId
        name
        valueAdd
      }
    }
  }
`
