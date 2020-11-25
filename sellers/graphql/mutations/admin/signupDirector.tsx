import { gql } from '@apollo/client'

export const SIGNUP_DIRECTOR = gql`
  mutation($phone: String!, $email: String!, $password: String!, $name: String!) {
    registerDirector(phone: $phone, email: $email, password: $password, name: $name) {
      code
      message
      success
      type
      admin {
        adminId
        tenantId
        phone
        email
        name
        permissions
        createdAt
        token
      }
    }
  }
`
