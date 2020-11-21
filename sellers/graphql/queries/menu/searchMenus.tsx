import { gql } from '@apollo/client'

export const SEARCH_MENUS = gql`
  query($tenant_id: ID!, $search_query: String) {
    searchMenus(
      tenant_id: $tenant_id
      search_query: $search_query
    ) {
      menu_id
      tenant_id
      published
      title
      image {
        image_id
        image_url
        __typename
      }
    }
  }
`
