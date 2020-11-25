import { gql } from '@apollo/client'

export const SEND_SMS = gql`
  mutation($phone: String!, $customerId: ID!) {
    sendMessage(phone: $phone, customerId: $customerId) {
      body
      phone
    }
  }
`
