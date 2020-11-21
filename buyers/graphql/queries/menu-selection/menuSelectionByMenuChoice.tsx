import { gql } from '@apollo/client'

export const MENU_SELECTIONS_BY_MENU_CHOICE = gql`
  query($choice_id: ID!) {
    menuSelectionsByMenuChoice(choice_id: $choice_id) {
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
