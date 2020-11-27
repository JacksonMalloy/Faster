import styled from 'styled-components'
import { Button } from '../common/Button'
import { useLazyQuery, useMutation } from '@apollo/client'

// SVGs
import Trash from 'assets/trash.svg'
import Tools from 'assets/tools.svg'
import FileMedia from 'assets/file-media.svg'

import { REMOVE_MENU_ITEM } from 'graphql/mutations/menu-item/deleteMenuItem'
import { MENU_ITEMS_BY_MENU } from 'graphql/queries/menu-item/menuItemsByMenu'
import { itemDeleter } from 'utils'
import { useUI } from '../Context'
import { Card } from '../UI'
import { MENU_ITEM } from 'graphql/queries/menu-item/menuItem'
import { useEffect } from 'react'

type CardProps = {
  item: {
    basePrice: string
    description: string
    menuId: number
    itemId: number
    name: string
    image?: {
      imageId: number
      imageUrl: string
      menuId?: number
      itemId?: number
      tenantId: number
      uploadedAt: number
    }
  }
}

export const ItemCard = ({ item }: CardProps) => {
  const { menuId, itemId, image } = item

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

  const [deleteMenuItem] = useMutation(REMOVE_MENU_ITEM)

  const [loadItem, { called, loading, data }] = useLazyQuery(MENU_ITEM, {
    variables: { itemId: itemId },
    fetchPolicy: 'network-only',
  })

  const deleteItem = () => {
    deleteMenuItem({
      variables: { itemId: itemId },
      update: (store, { data }) => {
        const menuItemData: any = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menuId: menuId },
        })

        const newData = itemDeleter(menuItemData.menuItemsByMenu, data.deleteMenuItem.menuItem.itemId)

        store.writeQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menuId: menuId },
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
          menuItem: { menuHeader, menuChoices },
        } = data

        setFormHeader(menuHeader)

        if (menuChoices) {
          for (let key of menuChoices) {
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
        menuItem: { menuChoices },
      } = data

      const isArrayEqualLength = menuChoices.length === formAddOns.length

      let mergedArray = []

      // Merge group ID with choice
      if (isArrayEqualLength) {
        for (let index = 0; index < formAddOns.length; index++) {
          mergedArray.push({
            ...formAddOns[index],
            ...menuChoices[index],
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
          <p>{item.basePrice}</p>
        </header>
        <section>
          <Button value="edit" onClick={handleEditItem}>
            Edit
          </Button>

          <Button value="delete" onClick={deleteItem}>
            Delete
          </Button>
        </section>
      </div>
      <aside>{image && image.imageUrl ? <img src={image.imageUrl} alt="" /> : <div className="placeholder" />}</aside>
    </Card>
  )
}
