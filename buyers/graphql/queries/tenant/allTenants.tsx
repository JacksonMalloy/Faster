import { gql } from '@apollo/client'

export const TENANTS = gql`
  query {
    tenants {
      name
      tenantId
      address
      accessCode
    }
  }
`
