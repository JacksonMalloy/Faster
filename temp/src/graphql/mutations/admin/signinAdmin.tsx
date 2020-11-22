import { gql } from '@apollo/client'

export const SIGNIN_ADMIN = gql`
  mutation($email: String!, $password: String!) {
    signinAdmin(email: $email, password: $password) {
      code
      message
      success
      admin {
        admin_id
        organization_id
        phone
        email
        name
        permissions
        created_at
        token
      }
    }
  }
`
