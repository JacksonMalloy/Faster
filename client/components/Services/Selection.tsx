import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuSelectionsByOrganization'
import { itemDeleter, itemReplacer } from 'utils'
import { MENU_SELECTIONS_BY_ORGANIZATION } from '../../graphql/queries/menu-selection/menuSelectionsByOrganization'

export const handleDeleteSelection = async (mutation, args) => {
  const { variables, menuId } = args
  const data = await mutation({
    variables: variables,
    // update: (store, { data }) => {
    //   const menuHeaderData: any = store.readQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { menu_selection_id: menuId },
    //   })

    //   console.log({ menuHeaderData })
    //   console.log({ data })

    //   const newData = itemDeleter(menuHeaderData.menuSelectionsByOrganization, data.removeMenuHeader.menu_header.menu_selection_id)

    //   console.log({ newData })

    //   store.writeQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { menu_selection_id: menuId },
    //     data: {
    //       menuSelectionsByOrganization: [...newData],
    //     },
    //   })
    // },
  })

  return data
}

export const handleEditSelection = async (mutation, args) => {
  const { variables, organizationId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const variables = { organization_id: organizationId }

      const selectionData: any = store.readQuery({
        query: MENU_SELECTIONS_BY_ORGANIZATION,
        variables: variables,
      })

      const oldItem = selectionData.menuSelectionsByOrganization.find(
        (obj: { menu_selection_id: number }) =>
          obj.menu_selection_id === data.editMenuSelection.menu_selection.menu_selection_id
      )

      const newData = itemReplacer(
        selectionData.menuSelectionsByOrganization,
        oldItem,
        data.editMenuSelection.menu_selection
      )

      store.writeQuery({
        query: MENU_SELECTIONS_BY_ORGANIZATION,
        variables: variables,
        data: {
          menuSelectionsByOrganization: [...newData],
        },
      })
    },
  })

  return data
}

export const handleCreateSelection = async (mutation, args) => {
  const { variables, organizationId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const variables = { organization_id: organizationId }

        const selectionData: any = store.readQuery({
          query: MENU_SELECTIONS_BY_ORGANIZATION,
          variables: variables,
        })

        store.writeQuery({
          query: MENU_SELECTIONS_BY_ORGANIZATION,
          variables: variables,
          data: {
            menuSelectionsByOrganization: [...selectionData.menuSelectionsByOrganization, data.addMenuSelection],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}
