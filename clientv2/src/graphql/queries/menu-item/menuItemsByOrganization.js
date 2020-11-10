import { gql } from '@apollo/client'

export const MENU_ITEMS_BY_ORGANIZATION = gql`
  query($organization_id: ID!) {
    menuItemsByOrganization(organization_id: $organization_id) {
      menu_item_id
      menu_id
      base_price
      description
      name
      menu_header {
        menu_header_id
        menu_id
        name
        sub_header
      }
    }
  }
`
