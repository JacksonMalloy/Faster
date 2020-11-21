import { gql } from '@apollo/client'

export const MENU_SELECTIONS_BY_TENANT = gql`
  query($tenant_id: ID!) {
    menuSelectionsByTenant(tenant_id: $tenant_id) {
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
