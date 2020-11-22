import { gql } from '@apollo/client'

export const CUSTOMERS_BY_ORGANIZATION = gql`
  query($organization_id: ID!) {
    customersByOrganization(organization_id: $organization_id) {
      customer_id
      phone
      email
      name
      permissions
      created_at
      table_id
    }
  }
`
