import { gql } from '@apollo/client'

export const MENU_CHOICE = gql`
  query($menu_choice_id: ID!) {
    menuChoice(menu_choice_id: $menu_choice_id) {
      menu_choice_id
      organization_id
      menu_item_id
      header
      sub_header
    }
  }
`
