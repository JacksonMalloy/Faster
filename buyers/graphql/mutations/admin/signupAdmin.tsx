import { gql } from '@apollo/client'

export const SIGNUP_ADMIN = gql`
  mutation(phone: String!, email: String!, password: String!, name: String!) {
    signupAdmin(phone: $phone, email: $email, password: $password, name: $name) {
      code
      message
      success
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
