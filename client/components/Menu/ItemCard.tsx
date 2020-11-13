import styled from 'styled-components'
import { Button } from '../common/Button'
import { useLazyQuery, useMutation } from '@apollo/client'

// SVGs
import Trash from 'assets/trash.svg'
import Tools from 'assets/tools.svg'
import FileMedia from 'assets/file-media.svg'

import { REMOVE_MENU_ITEM } from 'graphql/mutations/menu-item/removeMenuItem'
import { MENU_ITEMS_BY_MENU } from 'graphql/queries/menu-item/menuItemsByMenu'
import { itemDeleter } from 'utils'
import { useUI } from '../Context'
import { Card } from '../UI'
import { MENU_ITEM } from 'graphql/queries/menu-item/menuItem'
import { useEffect } from 'react'

const StyledActions = styled.div`
  width: 100%;
  padding: 1rem;
  flex: 1;
  display: flex;

  button {
    cursor: pointer;
    padding: 0.4rem;
    border: 0.1rem solid #ffffff;
    border-radius: 500px;
    background-color: white;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 300;
    color: #010101;
    text-align: center;
    transition: all 0.2s;

    &:hover {
      color: #010101;
      background-color: #f6f6f6;
      border: 0.1rem solid #f6f6f6;
    }

    &:disabled {
      border: 0.1rem solid #f6f6f6;
      background-color: white;
      color: #cccccc;
    }
  }

  svg {
    fill: #010101;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }

  button {
    &:hover {
      svg {
        fill: #000000;
      }
    }
  }
`

type CardProps = {
  item: {
    base_price: string
    description: string
    menu_id: number
    menu_item_id: number
    name: string
    image?: {
      image_id: number
      image_url: string
      menu_id?: number
      menu_item_id?: number
      organization_id: number
      uploaded_at: number
    }
  }
}

export const ItemCard = ({ item }: CardProps) => {
  const { menu_id, menu_item_id, image } = item

  const {
    reset,
    setSelectedItem,
    setFormView,
    setFormHeader,
    setFormChoices,
    setFormSelections,
    setFormAddOns,
    formAddOns,
  } = useUI()

  const [removeMenuItem] = useMutation(REMOVE_MENU_ITEM)

  const [loadItem, { called, loading, data }] = useLazyQuery(MENU_ITEM, {
    variables: { menu_item_id: menu_item_id },
    fetchPolicy: 'network-only',
  })

  const deleteMenuItem = () => {
    removeMenuItem({
      variables: { menu_item_id: menu_item_id },
      update: (store, { data }) => {
        const menuItemData: any = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
        })

        const newData = itemDeleter(menuItemData.menuItemsByMenu, data.removeMenuItem.menu_item.menu_item_id)

        store.writeQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
          data: {
            menuItemsByMenu: [...newData],
          },
        })
      },
    })
  }

  const handleEditItem = () => {
    loadItem()
    reset()
  }

  // Simulate callback to set items' initial state
  useEffect(() => {
    if (called && !loading) {
      setFormView('EDIT_ITEM_VIEW')
      setSelectedItem(data.menuItem)

      // Data
      console.log({ data })

      if (data && data.menuItem) {
        const {
          menuItem: { menu_header, menu_choices },
        } = data

        setFormHeader(menu_header)

        if (menu_choices) {
          for (let key of menu_choices) {
            setFormAddOns()
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [called, loading, data])

  useEffect(() => {
    if (data && data.menuItem) {
      const {
        menuItem: { menu_choices },
      } = data

      const isArrayEqualLength = menu_choices.length === formAddOns.length

      let mergedArray = []

      // Merge group ID with choice
      if (isArrayEqualLength) {
        for (let index = 0; index < formAddOns.length; index++) {
          mergedArray.push({
            ...formAddOns[index],
            ...menu_choices[index],
          })
        }

        console.log({ mergedArray })

        // Populate Choices and Selections in assigned group
        for (let choice of mergedArray) {
          console.log({ choice })

          setFormChoices(choice)

          const { selections } = choice

          selections.forEach((selection) => {
            const { UUID } = choice
            const newKey = { ...selection, UUID }
            setFormSelections(newKey)
          })
        }
      }
    }
    // eslint-disable-next-line
  }, [data, formAddOns])

  return (
    <Card>
      <div className="actions">
        <header>
          <h2>{item.name}</h2>
          <span>{item.description}</span>
          <p>${item.base_price}</p>
        </header>
        <StyledActions>
          <Button value="edit" onClick={handleEditItem}>
            <span>
              <Tools />
            </span>
          </Button>

          <Button value="delete" onClick={deleteMenuItem}>
            <span>
              <Trash />
            </span>
          </Button>
        </StyledActions>
      </div>
      <aside>{image && image.image_url ? <img src={image.image_url} alt="" /> : <div className="placeholder" />}</aside>
    </Card>
  )
}
