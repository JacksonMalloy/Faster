import { gql } from '@apollo/client'

export const MENUS_BY_TENANT = gql`
  query($tenantId: ID!) {
    menusByTenant(tenantId: $tenantId) {
      menuId
      tenantId
      #createdAt
      updatedAt
      published
      title
      image {
        imageUrl
      }
    }
  }
`
