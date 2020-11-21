import { gql } from '@apollo/client'

export const MENU_SELECTION = gql`
  query($selection_id: ID!) {
    menuSelection(selection_id: $selection_id) {
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
