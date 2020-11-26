import { gql } from '@apollo/client'

export const SIGNUP_ADMIN = gql`
  mutation(phone: String!, email: String!, password: String!, name: String!) {
    registerAdmin(phone: $phone, email: $email, password: $password, name: $name) {
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
        #createdAt
        token
      }
    }
  }
`
