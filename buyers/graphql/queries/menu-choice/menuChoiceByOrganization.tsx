import { gql } from '@apollo/client'

export const MENU_CHOICES_BY_ORGANIZATION = gql`
  query($organization_id: ID!) {
    menuChoicesByOrganization(organization_id: $organization_id) {
      menu_choice_id
      organization_id
      menu_item_id
      header
      sub_header
      selections {
        organization_id
        menu_selection_id
        menu_choice_id
        menu_item_id
        name
        value_add
        selected
      }
    }
  }
`
