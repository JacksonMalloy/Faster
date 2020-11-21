import { gql } from '@apollo/client'

export const IMAGES_BY_TENANT = gql`
  query($tenant_id: ID!) {
    imagesByTenant(tenant_id: $tenant_id) {
      uploaded_at
      image_id
      image_url
      item_id
      menu_id
      tenant_id
    }
  }
`
