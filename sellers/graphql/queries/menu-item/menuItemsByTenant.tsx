import { gql } from '@apollo/client'

export const MENU_ITEMS_BY_TENANT = gql`
  query($tenant_id: ID!) {
    menuItemsByTenant(tenant_id: $tenant_id) {
      item_id
      menu_id
      base_price
      description
      name
      menu_header {
        header_id
        menu_id
        name
        sub_header
      }
    }
  }
`
