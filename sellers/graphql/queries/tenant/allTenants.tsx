import { gql } from '@apollo/client'

export const TENANTS = gql`
  query {
    tenant {
      name
      tenantId
    }
  }
`
