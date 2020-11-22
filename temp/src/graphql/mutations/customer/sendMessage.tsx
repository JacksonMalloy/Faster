import { gql } from '@apollo/client'

export const SEND_SMS = gql`
  mutation($phone: String!, $customer_id: ID!) {
    sendMessage(phone: $phone, customer_id: $customer_id) {
      body
      phone
    }
  }
`
