import { gql } from '@apollo/client'

export const ORGANIZATIONS = gql`
  query {
    organization {
      name
      organization_id
    }
  }
`
