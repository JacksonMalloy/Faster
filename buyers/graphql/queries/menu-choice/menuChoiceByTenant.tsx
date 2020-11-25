import { gql } from '@apollo/client'

export const MENU_CHOICES_BY_TENANT = gql`
  query($tenantId: ID!) {
    menuChoicesByTenant(tenantId: $tenantId) {
      choiceId
      tenantId
      itemId
      header
      description
      selections {
        tenantId
        selectionId
        choiceId
        itemId
        name
        valueAdd
        selected
      }
    }
  }
`
