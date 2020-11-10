import { gql } from '@apollo/client'

export const SIGNIN_CUSTOMER = gql`
  mutation(email: String!, password: String!) {
    signinCustomer(email: $email, password: $password) {
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
