import { gql } from '@apollo/client'

export const ADD_MENU = gql`
  mutation($organization_id: ID!, $title: String!) {
    addMenu(organization_id: $organization_id, title: $title) {
      code
      message
      success
      menu {
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
  }
`
