import { gql } from '@apollo/client'

export const UPLOAD_IMAGE = gql`
  mutation($file: Upload!, $organization_id: ID!, $organization_name: String!) {
    uploadImage(
      file: $file
      organization_id: $organization_id
      organization_name: $organization_name
    ) {
      image_id
      organization_id
      image_url
      menu_item_id
      menu_id
      uploaded_at
    }
  }
`
