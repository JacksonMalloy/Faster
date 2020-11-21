import { gql } from '@apollo/client'

export const MENUS_BY_TENANT = gql`
  query($tenant_id: ID!) {
    menusByTenant(tenant_id: $tenant_id) {
      menu_id
      tenant_id
      created_at
      updated_at
      published
      title
      image {
        image_url
      }
    }
  }
`
