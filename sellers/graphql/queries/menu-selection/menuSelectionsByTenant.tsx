import { gql } from '@apollo/client'

export const MENU_SELECTIONS_BY_TENANT = gql`
  query($tenantId: ID!) {
    menuSelectionsByTenant(tenantId: $tenantId) {
      tenantId
      selectionId
      choiceId
      itemId
      name
      valueAdd
      selected
    }
  }
`
