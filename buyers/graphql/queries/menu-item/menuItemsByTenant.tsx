import { gql } from '@apollo/client'

export const MENU_ITEMS_BY_TENANT = gql`
  query($tenantId: ID!) {
    menuItemsByTenant(tenantId: $tenantId) {
      itemId
      menuId
      basePrice
      description
      name
      menuHeader {
        headerId
        menuId
        name
        description
      }
    }
  }
`
