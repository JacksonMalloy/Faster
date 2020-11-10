import { gql } from '@apollo/client'

export const SEARCH_MENUS = gql`
  query($organization_id: ID!, $search_query: String) {
    searchMenus(
      organization_id: $organization_id
      search_query: $search_query
    ) {
      menu_id
      organization_id
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
