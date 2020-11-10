import { gql } from '@apollo/client'

export const EDIT_MENU_SELECTION = gql`
  mutation($menu_selection_id: ID!, $name: String, $value_add: String) {
    editMenuSelection(
      menu_selection_id: $menu_selection_id
      name: $name
      value_add: $value_add
    ) {
      code
      success
      message
      menu_selection {
        organization_id
        menu_selection_id
        menu_choice_id
        menu_item_id
        name
        value_add
      }
    }
  }
`
