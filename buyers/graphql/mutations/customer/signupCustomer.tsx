import { gql } from '@apollo/client'

export const SIGNUP_CUSTOMER = gql`
  mutation($phone: String, $email: String, $name: String!) {
    registerCustomer(phone: $phone, email: $email, name: $name) {
      code
      message
      success
      customer {
        customerId
        phone
        email
        name
        permissions
      }
    }
  }
`
