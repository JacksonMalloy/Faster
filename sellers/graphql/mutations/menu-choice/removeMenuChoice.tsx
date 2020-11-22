import { gql } from '@apollo/client'

export const REMOVE_MENU_CHOICE = gql`
  mutation($menu_choice_id: ID!) {
    removeMenuChoice(menu_choice_id: $menu_choice_id) {
      code
      message
      success
      menu_choice {
        menu_choice_id
      }
    }
  }
`
