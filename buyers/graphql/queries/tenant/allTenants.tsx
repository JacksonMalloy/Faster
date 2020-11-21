import { gql } from '@apollo/client'

export const TENANTS = gql`
  query {
    tenants {
      name
      tenant_id
      address
      access_code
    }
  }
`
