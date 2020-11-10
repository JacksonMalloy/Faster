import { gql } from '@apollo/client'

export const RESET_PASSWORD = gql`
  mutation($email: String!) {
    resetPassword(email: $email) {
      code
      message
      success
    }
  }
`
