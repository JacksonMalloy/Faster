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

type CardProps = {
  item: {
    base_price: string
    description: string
    menu_id: number
    item_id: number
    name: string
    image?: {
      image_id: number
      image_url: string
      menu_id?: number
      item_id?: number
      tenant_id: number
      uploaded_at: number
    }
  }
}

export const ItemCard = ({ item }: CardProps) => {
  const { menu_id, item_id, image } = item

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
    variables: { item_id: item_id },
    fetchPolicy: 'network-only',
  })

  const deleteMenuItem = () => {
    removeMenuItem({
      variables: { item_id: item_id },
      update: (store, { data }) => {
        const menuItemData: any = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
        })

        const newData = itemDeleter(menuItemData.menuItemsByMenu, data.removeMenuItem.menu_item.item_id)

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
      <div>
        <header>
          <h2>{item.name}</h2>
          <span>{item.description}</span>
          <p>{item.base_price}</p>
        </header>
        <section>
          <Button value="edit" onClick={handleEditItem}>
            Edit
          </Button>

          <Button value="delete" onClick={deleteMenuItem}>
            Delete
          </Button>
        </section>
      </div>
      <aside>{image && image.image_url ? <img src={image.image_url} alt="" /> : <div className="placeholder" />}</aside>
    </Card>
  )
}
