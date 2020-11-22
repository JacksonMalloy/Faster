import { gql } from '@apollo/client'

export const IMAGES_BY_ORGANIZATION = gql`
  query($organization_id: ID!) {
    imagesByOrganization(organization_id: $organization_id) {
      uploaded_at
      image_id
      image_url
      menu_item_id
      menu_id
      organization_id
    }
  }
`
