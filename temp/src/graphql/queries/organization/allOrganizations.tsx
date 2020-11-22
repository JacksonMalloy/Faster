import { gql } from '@apollo/client'

export const ORGANIZATIONS = gql`
  query {
    organizations {
      name
      organization_id
      address
      access_code
    }
  }
`
