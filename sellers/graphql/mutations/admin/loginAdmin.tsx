import { gql } from '@apollo/client'

export const SIGNIN_ADMIN = gql`
  mutation($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      code
      message
      success
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
