import { gql } from '@apollo/client'

export const MENU_CHOICES_BY_TENANT = gql`
  query($tenant_id: ID!) {
    menuChoicesByTenant(tenant_id: $tenant_id) {
      choice_id
      tenant_id
      item_id
      header
      sub_header
      selections {
        tenant_id
        selection_id
        choice_id
        item_id
        name
        value_add
        selected
      }
    }
  }
`
