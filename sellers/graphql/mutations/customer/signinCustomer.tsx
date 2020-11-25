import { gql } from '@apollo/client'

export const SIGNIN_CUSTOMER = gql`
  mutation(email: String!, password: String!) {
    signinCustomer(email: $email, password: $password) {
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
