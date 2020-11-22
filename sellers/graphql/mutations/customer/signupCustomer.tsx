import { gql } from '@apollo/client'

export const SIGNUP_CUSTOMER = gql`
  mutation(phone: String!, email: String!, password: String!, name: String!) {
    signupCustomer(phone: $phone, email: $email, password: $password, name: $name) {
      code
      message
      success
      customer {
        customer_id
        phone
        email
        name
        permissions
        created_at
        table_id
        token
      }
    }
  }
`
