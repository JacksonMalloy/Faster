import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuSelectionsByTenant'
import { itemDeleter, itemReplacer } from 'utils'
import { MENU_SELECTIONS_BY_TENANT } from '../../graphql/queries/menu-selection/menuSelectionsByTenant'

export const handleDeleteSelection = async (mutation, args) => {
  const { variables, menuId } = args
  const data = await mutation({
    variables: variables,
    // update: (store, { data }) => {
    //   const menuHeaderData: any = store.readQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { selection_id: menuId },
    //   })

    //   console.log({ menuHeaderData })
    //   console.log({ data })

    //   const newData = itemDeleter(menuHeaderData.menuSelectionsByTenant, data.removeMenuHeader.menu_header.selection_id)

    //   console.log({ newData })

    //   store.writeQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { selection_id: menuId },
    //     data: {
    //       menuSelectionsByTenant: [...newData],
    //     },
    //   })
    // },
  })

  return data
}

export const handleEditSelection = async (mutation, args) => {
  const { variables, tenantId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const variables = { tenant_id: tenantId }

      const selectionData: any = store.readQuery({
        query: MENU_SELECTIONS_BY_TENANT,
        variables: variables,
      })

      const oldItem = selectionData.menuSelectionsByTenant.find(
        (obj: { selection_id: number }) =>
          obj.selection_id === data.editMenuSelection.menu_selection.selection_id
      )

      const newData = itemReplacer(
        selectionData.menuSelectionsByTenant,
        oldItem,
        data.editMenuSelection.menu_selection
      )

      store.writeQuery({
        query: MENU_SELECTIONS_BY_TENANT,
        variables: variables,
        data: {
          menuSelectionsByTenant: [...newData],
        },
      })
    },
  })

  return data
}

export const handleCreateSelection = async (mutation, args) => {
  const { variables, tenantId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const variables = { tenant_id: tenantId }

        const selectionData: any = store.readQuery({
          query: MENU_SELECTIONS_BY_TENANT,
          variables: variables,
        })

        store.writeQuery({
          query: MENU_SELECTIONS_BY_TENANT,
          variables: variables,
          data: {
            menuSelectionsByTenant: [...selectionData.menuSelectionsByTenant, data.addMenuSelection],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}
