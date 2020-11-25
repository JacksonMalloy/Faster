import { gql } from '@apollo/client'

export const SIGNUP_CUSTOMER = gql`
  mutation(phone: String!, email: String!, password: String!, name: String!) {
    signupCustomer(phone: $phone, email: $email, password: $password, name: $name) {
      code
      message
      success
      customer {
        customerId
        phone
        email
        name
        permissions
        createdAt
        table_id
        token
      }
    }
  }
`
