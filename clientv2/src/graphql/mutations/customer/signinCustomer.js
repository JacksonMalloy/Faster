import { gql } from '@apollo/client'

export const SIGNIN_CUSTOMER = gql`
  mutation($email: String, $phone: String, $pin: String!) {
    signinCustomer(email: $email, phone: $phone, pin: $pin) {
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
