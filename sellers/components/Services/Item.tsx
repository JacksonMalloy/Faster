import { MENU_ITEM } from 'graphql/queries/menu-item/menuItem'
import { MENU_ITEMS_BY_MENU } from 'graphql/queries/menu-item/menuItemsByMenu'
import { itemReplacer } from 'utils'

export const handleCreateItem = async (mutation, args) => {
  const { variables, menu_id } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const {
        addMenuItem: {
          menu_item: { menu_id },
        },
      } = data

      try {
        const menuItemData = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
        })

        store.writeQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
          data: {
            menuItemsByMenu: [...menuItemData.menuItemsByMenu, data.addMenuItem.menu_item],
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
  const { variables, menu_id } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const menuItemData = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
        })

        const oldItem = menuItemData.menuItemsByMenu.find(
          (obj: { item_id: number }) => obj.item_id === data.editMenuItem.menu_item.item_id
        )

        const newData = itemReplacer(menuItemData.menuItemsByMenu, oldItem, data.editMenuItem.menu_item)

        store.writeQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
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
  const { variables, menu_id } = args

  mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const menuItemData = store.readQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
        })

        const oldItem = menuItemData.menu.menu_items.find(
          (obj: { item_id: number }) => obj.item_id === data.connectImageToMenuItem.item_id
        )

        const newData = itemReplacer(menuItemData.menu.menu_items, oldItem, data.connectImageToMenuItem.item_id)

        store.writeQuery({
          query: MENU_ITEMS_BY_MENU,
          variables: { menu_id: menu_id },
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

  const choiceIDs = selectedItem.menu_choices.map((choice) => choice.choice_id)

  const variables = {
    item_id: selectedItem.item_id,
    choice_ids: choiceIDs,
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
      const selectionIDs = choice.selections.map((selection) => selection.selection_id)

      const variables = {
        choice_id: choice.choice_id,
        selection_ids: selectionIDs,
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
      const choiceIDs = formChoices.map((choice) => choice.choice_id)

      const variables = {
        item_id: selectedItem.item_id,
        choice_ids: choiceIDs,
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
          (selection: { selection_id: number }) => selection.selection_id
        )

        const variables = {
          choice_id: choice.choice_id,
          selection_ids: arrayOfMenuSelectionIds,
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
