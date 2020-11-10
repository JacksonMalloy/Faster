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
          (obj: { menu_item_id: number }) => obj.menu_item_id === data.editMenuItem.menu_item.menu_item_id
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
          (obj: { menu_item_id: number }) => obj.menu_item_id === data.connectImageToMenuItem.menu_item_id
        )

        const newData = itemReplacer(menuItemData.menu.menu_items, oldItem, data.connectImageToMenuItem.menu_item_id)

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
  const { item, choiceGroups, choices, selections } = args
  const {
    removeMenuChoicesMenuItemsConnection,
    connectMenuChoiceToMenuItem,
    removeMenuSelectionsMenuChoicesConnection,
    connectMenuSelectionToMenuChoice,
  } = mutations
  const { menu_choices, menu_item_id } = item
  const choiceIDs = menu_choices.map((choice: { menu_choice_id: number }) => choice.menu_choice_id)

  const variables = {
    menu_item_id: menu_item_id,
    menu_choice_ids: choiceIDs,
  }

  if (choiceIDs.length) {
    removeMenuChoicesMenuItemsConnection({
      variables: variables,
      refetchQueries: [
        {
          query: MENU_ITEM,
          variables: { menu_item_id: menu_item_id },
        },
      ],
    })
  }

  for (let choice of menu_choices) {
    const selectionIDs = choice.selections.map(
      (selection: { menu_selection_id: number }) => selection.menu_selection_id
    )

    const variables = {
      menu_choice_id: choice.menu_choice_id,
      menu_selection_ids: selectionIDs,
    }

    if (selectionIDs.length) {
      removeMenuSelectionsMenuChoicesConnection({
        variables: variables,
        refetchQueries: [
          {
            query: MENU_ITEM,
            variables: { menu_item_id: menu_item_id },
          },
        ],
      })
    }
  }

  if (choiceGroups.length && choices.length) {
    const choiceIDs = choices.map((choice: { menu_choice_id: number }) => choice.menu_choice_id)

    const variables = {
      menu_item_id: menu_item_id,
      menu_choice_ids: choiceIDs,
    }

    if (choiceIDs.length) {
      connectMenuChoiceToMenuItem({
        variables: variables,
        refetchQueries: [
          {
            query: MENU_ITEM,
            variables: { menu_item_id: menu_item_id },
          },
        ],
      })
    }
  }

  if (choiceGroups.length && choices.length && selections.length) {
    for (let choice of choices) {
      const arrayOfMenuSelectionIds = selections
        .filter((selection: { id: string }) => selection.id === choice.id)
        .map((selection: { menu_selection_id: number }) => selection.menu_selection_id)

      const variables = {
        menu_choice_id: choice.menu_choice_id,
        menu_selection_ids: arrayOfMenuSelectionIds,
      }

      if (arrayOfMenuSelectionIds.length) {
        connectMenuSelectionToMenuChoice({
          variables: variables,
          refetchQueries: [
            {
              query: MENU_ITEM,
              variables: { menu_item_id: menu_item_id },
            },
          ],
        })
      }
    }
  }
}

export const handleDeleteItem = async () => {
  console.log('delete')
}
