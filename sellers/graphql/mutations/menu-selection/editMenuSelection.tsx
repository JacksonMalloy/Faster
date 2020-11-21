import { gql } from '@apollo/client'

export const EDIT_MENU_SELECTION = gql`
  mutation($selection_id: ID!, $name: String, $value_add: String) {
    editMenuSelection(selection_id: $selection_id, name: $name, value_add: $value_add) {
      code
      success
      message
      menu_selection {
        tenant_id
        selection_id
        choice_id
        item_id
        name
        value_add
      }
    }
  }
`
