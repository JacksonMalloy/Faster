import { gql } from '@apollo/client'

export const UPLOAD_IMAGE = gql`
  mutation($file: Upload!, $tenant_id: ID!, $tenant_name: String!) {
    uploadImage(file: $file, tenant_id: $tenant_id, tenant_name: $tenant_name) {
      image_id
      tenant_id
      image_url
      item_id
      menu_id
      uploaded_at
    }
  }
`
