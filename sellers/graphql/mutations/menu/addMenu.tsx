import { gql } from '@apollo/client'

export const ADD_MENU = gql`
  mutation($tenantId: ID!, $title: String!) {
    addMenu(tenantId: $tenantId, title: $title) {
      code
      message
      success
      menu {
        menuId
        tenantId
        createdAt
        updatedAt
        published
        title
        image {
          imageUrl
        }
      }
    }
  }
`
