import { gql } from '@apollo/client'

export const MENU_SELECTION = gql`
  query($menu_selection_id: ID!) {
    menuSelection(menu_selection_id: $menu_selection_id) {
      organization_id
      menu_selection_id
      menu_choice_id
      menu_item_id
      name
      value_add
      selected
    }
  }
`
