import { gql } from '@apollo/client'

export const MENU = gql`
  query($menu_id: ID!) {
    menu(menu_id: $menu_id) {
      menu_id
      tenant_id
      created_at
      updated_at
      published
      title
      image {
        uploaded_at
        image_id
        image_url
        item_id
        menu_id
        tenant_id
        __typename
      }
      menu_items {
        item_id
        menu_id
        base_price
        description
        name
        image {
          uploaded_at
          image_id
          image_url
          item_id
          menu_id
        }
        menu_header {
          header_id
          menu_id
          name
          sub_header
        }
        menu_choices {
          choice_id
          tenant_id
          item_id
          header
          sub_header
          selections {
            tenant_id
            selection_id
            choice_id
            item_id
            name
            value_add
            selected
          }
        }
      }
    }
  }
`
