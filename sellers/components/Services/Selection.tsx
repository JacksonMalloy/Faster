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
    //     variables: { selectionId: menuId },
    //   })

    //   console.log({ menuHeaderData })
    //   console.log({ data })

    //   const newData = itemDeleter(menuHeaderData.menuSelectionsByTenant, data.deleteMenuHeader.menuHeader.selectionId)

    //   console.log({ newData })

    //   store.writeQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { selectionId: menuId },
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
      const variables = { tenantId: tenantId }

      const selectionData: any = store.readQuery({
        query: MENU_SELECTIONS_BY_TENANT,
        variables: variables,
      })

      const oldItem = selectionData.menuSelectionsByTenant.find(
        (obj: { selectionId: number }) => obj.selectionId === data.updateMenuSelection.menuSelection.selectionId
      )

      const newData = itemReplacer(
        selectionData.menuSelectionsByTenant,
        oldItem,
        data.updateMenuSelection.menuSelection
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
        const variables = { tenantId: tenantId }

        const selectionData: any = store.readQuery({
          query: MENU_SELECTIONS_BY_TENANT,
          variables: variables,
        })

        store.writeQuery({
          query: MENU_SELECTIONS_BY_TENANT,
          variables: variables,
          data: {
            menuSelectionsByTenant: [...selectionData.menuSelectionsByTenant, data.createMenuSelection],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}
