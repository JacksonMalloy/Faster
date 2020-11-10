import { gql } from '@apollo/client'

export const MENUS_BY_ORGANIZATION = gql`
  query($organization_id: ID!) {
    menusByOrganization(organization_id: $organization_id) {
      menu_id
      organization_id
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
