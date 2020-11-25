import { MENU_ITEM } from 'graphql/queries/menu-item/menuItem'
import { MENU_ITEMS_BY_MENU } from 'graphql/queries/menu-item/menuItemsByMenu'
import { itemReplacer } from 'utils'

export const handleCreateItem = async (mutation, args) => {
  const { variables, menuId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const {
        createMenuItem: {
          menuItem: { menuId },
        },
      } = data

      try {
        const menuItemData = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menuId: menuId },
        })

        store.writeQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menuId: menuId },
          data: {
            menuItemsByMenu: [...menuItemData.menuItemsByMenu, data.createMenuItem.menuItem],
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  })

  return data
}

export const handleChoicesAndSelections = async (mutation, args) => {
  const { variables } = args

  const data = await mutation({
    variables: variables,
  })

  return data
}

export const handleEditItem = async (mutation, args) => {
  const { variables, menuId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const menuItemData = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menuId: menuId },
        })

        const oldItem = menuItemData.menuItemsByMenu.find(
          (obj: { itemId: number }) => obj.itemId === data.updateMenuItem.menuItem.itemId
        )

        const newData = itemReplacer(menuItemData.menuItemsByMenu, oldItem, data.updateMenuItem.menuItem)

        store.writeQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menuId: menuId },
          data: {
            menuItemsByMenu: [...newData],
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  })

  return data
}

export const handleConnectingImageToItem = async (mutation, args) => {
  const { variables, menuId } = args

  mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const menuItemData = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menuId: menuId },
        })

        const oldItem = menuItemData.menu.menuItems.find(
          (obj: { itemId: number }) => obj.itemId === data.connectImageToMenuItem.itemId
        )

        const newData = itemReplacer(menuItemData.menu.menuItems, oldItem, data.connectImageToMenuItem.itemId)

        store.writeQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menuId: menuId },
          data: {
            menu: [...newData],
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  })
}

export const handleMenuChoiceItemConnections = async (mutations, args) => {
  const { selectedItem, formAddOns, formChoices, formSelections } = args

  const {
    removeMenuChoicesMenuItemsConnection,
    connectMenuChoiceToMenuItem,
    removeMenuSelectionsMenuChoicesConnection,
    connectMenuSelectionToMenuChoice,
  } = mutations

  const choiceIDs = selectedItem.menuChoices.map((choice) => choice.choiceId)

  const variables = {
    itemId: selectedItem.itemId,
    choiceIds: choiceIDs,
  }

  const removeChoicesController = async () => {
    if (choiceIDs.length) {
      try {
        const data = await removeMenuChoicesMenuItemsConnection({
          variables: variables,
        })

        return data
      } catch (error) {
        console.error(error)
      }
    }
  }

  const removedChoices = await removeChoicesController()
  // console.log({ removedChoices })

  const removeSelectionsController = async () => {
    for (let choice of formChoices) {
      const selectionIDs = choice.selections.map((selection) => selection.selectionId)

      const variables = {
        choiceId: choice.choiceId,
        selectionIds: selectionIDs,
      }

      if (selectionIDs.length) {
        try {
          const data = await removeMenuSelectionsMenuChoicesConnection({
            variables: variables,
          })

          return data
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  const removedSelections = await removeSelectionsController()
  // console.log({ removedSelections })

  const connectChoicesController = async () => {
    if (formAddOns.length && formChoices.length) {
      const choiceIDs = formChoices.map((choice) => choice.choiceId)

      const variables = {
        itemId: selectedItem.itemId,
        choiceIds: choiceIDs,
      }

      if (choiceIDs.length) {
        try {
          const data = await connectMenuChoiceToMenuItem({
            variables: variables,
          })

          return data
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  const connectedChoices = await connectChoicesController()
  // console.log({ connectedChoices })

  const connectSelectionsController = async () => {
    if (formAddOns.length && formChoices.length && formSelections.length) {
      console.log({ formChoices })

      for (let choice of formChoices) {
        const arrayOfMenuSelections = formSelections.filter(
          (selection: { UUID: string }) => selection.UUID === choice.UUID
        )
        console.log({ choice })
        console.log({ arrayOfMenuSelections })

        // [1, 4, 16, 234, 56, 12]
        const arrayOfMenuSelectionIds = arrayOfMenuSelections.map(
          (selection: { selectionId: number }) => selection.selectionId
        )

        const variables = {
          choiceId: choice.choiceId,
          selectionIds: arrayOfMenuSelectionIds,
        }

        try {
          const connect = await connectMenuSelectionToMenuChoice({
            variables: variables,
          })

          console.log({ connect })
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  const connectedSelections = await connectSelectionsController()
  // console.log({ connectedSelections })
}

export const handleDeleteItem = async () => {
  console.log('delete')
}
