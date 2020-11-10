import { gql } from '@apollo/client'

export const MENU_SELECTIONS_BY_MENU_CHOICE = gql`
  query($menu_choice_id: ID!) {
    menuSelectionsByMenuChoice(menu_choice_id: $menu_choice_id) {
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
