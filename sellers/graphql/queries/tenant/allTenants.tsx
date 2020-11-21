import { gql } from '@apollo/client'

export const TENANTS = gql`
  query {
    tenant {
      name
      tenant_id
    }
  }
`
