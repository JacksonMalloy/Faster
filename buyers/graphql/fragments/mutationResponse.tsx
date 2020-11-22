import { gql } from '@apollo/client'

// Not sure if this works!
export const MUTATION_RESPONSE = gql`
  fragment MutationResponse on Mutation {
    code
    success
    message
  }
`
