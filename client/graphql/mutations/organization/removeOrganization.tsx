import { gql } from '@apollo/client'

export const REMOVE_ORGANIZATION = gql`
  mutation($organization_id: ID!) {
    removeMenuSelection(organization_id: $organization_id) {
      code
      message
      success
      organization {
        organization_id
      }
    }
  }
`
