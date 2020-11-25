import { gql } from '@apollo/client'

export const SIGNIN_CUSTOMER = gql`
  mutation($email: String, $phone: String, $pin: String!) {
    signinCustomer(email: $email, phone: $phone, pin: $pin) {
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
