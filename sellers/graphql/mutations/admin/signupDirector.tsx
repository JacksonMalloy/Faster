import { gql } from '@apollo/client'

export const SIGNUP_DIRECTOR = gql`
  mutation(
    $phone: String!
    $email: String!
    $password: String!
    $name: String!
  ) {
    signupDirector(
      phone: $phone
      email: $email
      password: $password
      name: $name
    ) {
      code
      message
      success
      type
      admin {
        admin_id
        tenant_id
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
