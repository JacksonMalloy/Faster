import { gql } from '@apollo/client'

export const MENU_ITEM = gql`
  query($item_id: ID!) {
    menuItem(item_id: $item_id) {
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
        tenant_id
      }
      menu_header {
        header_id
        menu_id
        name
        sub_header
      }
      menu_choices {
        choice_id
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
`
