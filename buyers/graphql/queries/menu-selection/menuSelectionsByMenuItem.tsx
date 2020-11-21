import { gql } from '@apollo/client'

export const MENU_SELECTIONS_BY_MENU_ITEM = gql`
  query($item_id: ID!) {
    menuSelectionsByMenuItem(item_id: $item_id) {
      tenant_id
      selection_id
      choice_id
      item_id
      name
      value_add
      selected
    }
  }
`
