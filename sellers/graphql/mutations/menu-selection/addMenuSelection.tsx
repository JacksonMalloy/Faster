import { gql } from '@apollo/client'

export const ADD_MENU_SELECTION = gql`
  mutation($tenant_id: ID!, $name: String!, $value_add: String) {
    addMenuSelection(tenant_id: $tenant_id, name: $name, value_add: $value_add) {
      code
      success
      message
      menu_selection {
        tenant_id
        name
        value_add
      }
    }
  }
`
