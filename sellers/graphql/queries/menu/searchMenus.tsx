import { gql } from '@apollo/client'

export const SEARCH_MENUS = gql`
  query($tenantId: ID!, $searchQuery: String) {
    searchMenus(tenantId: $tenantId, searchQuery: $searchQuery) {
      menuId
      tenantId
      published
      title
      image {
        imageId
        imageUrl
        __typename
      }
    }
  }
`
