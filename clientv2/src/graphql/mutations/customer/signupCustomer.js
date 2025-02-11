import { gql } from '@apollo/client'

export const SIGNUP_CUSTOMER = gql`
  mutation($phone: String, $email: String, $name: String!) {
    signupCustomer(phone: $phone, email: $email, name: $name) {
      code
      message
      success
      customer {
        customer_id
        phone
        email
        name
        permissions
      }
    }
  }
`
