import { gql } from '@apollo/client'

export const ADD_MENU = gql`
  mutation($tenant_id: ID!, $title: String!) {
    addMenu(tenant_id: $tenant_id, title: $title) {
      code
      message
      success
      menu {
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
  }
`
