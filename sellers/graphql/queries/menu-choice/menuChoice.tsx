import { gql } from '@apollo/client'

export const MENU_CHOICE = gql`
  query($choice_id: ID!) {
    menuChoice(choice_id: $choice_id) {
      choice_id
      tenant_id
      item_id
      header
      sub_header
    }
  }
`
