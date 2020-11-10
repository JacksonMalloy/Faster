import { gql } from '@apollo/client'

export const MENU_SELECTIONS_BY_MENU_ITEM = gql`
  query($menu_item_id: ID!) {
    menuSelectionsByMenuItem(menu_item_id: $menu_item_id) {
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
