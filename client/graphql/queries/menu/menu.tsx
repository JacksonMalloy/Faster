import { gql } from '@apollo/client'

export const MENU = gql`
  query($menu_id: ID!) {
    menu(menu_id: $menu_id) {
      menu_id
      organization_id
      created_at
      updated_at
      published
      title
      image {
        uploaded_at
        image_id
        image_url
        menu_item_id
        menu_id
        organization_id
        __typename
      }
      menu_items {
        menu_item_id
        menu_id
        base_price
        description
        name
        image {
          uploaded_at
          image_id
          image_url
          menu_item_id
          menu_id
        }
        menu_header {
          menu_header_id
          menu_id
          name
          sub_header
        }
        menu_choices {
          menu_choice_id
          organization_id
          menu_item_id
          header
          sub_header
          selections {
            organization_id
            menu_selection_id
            menu_choice_id
            menu_item_id
            name
            value_add
            selected
          }
        }
      }
    }
  }
`
