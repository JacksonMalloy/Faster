import { gql } from '@apollo/client'

export const ADD_MENU_SELECTION = gql`
  mutation(
    $organization_id: ID!
    $menu_choice_id: ID
    $menu_item_id: ID
    $name: String!
    $value_add: String
  ) {
    addMenuSelection(
      organization_id: $organization_id
      menu_choice_id: $menu_choice_id
      menu_item_id: $menu_item_id
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
