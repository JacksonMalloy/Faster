import { MENUS_BY_TENANT } from 'graphql/queries/menu/menusByTenant'
import { itemDeleter, itemReplacer } from 'utils'

export const handleEditMenu = async (mutation, args) => {
  const { variables, tenantId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const variables = { tenantId: tenantId }

        const menuData: any = store.readQuery({
          query: MENUS_BY_TENANT,
          variables: variables,
        })

        const oldItem = menuData.menusByTenant.find(
          (obj: { menuId: any }) => obj.menuId === data.updateMenu.menu.menuId
        )
        const newData = itemReplacer(menuData.menusByTenant, oldItem, data.updateMenu.menu)

        store.writeQuery({
          query: MENUS_BY_TENANT,
          variables: { tenantId: tenantId },
          data: {
            menusByTenant: [...newData],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}

export const handleConnectImage = async (mutation, args) => {
  const { variables, tenantId } = args

  const imageData = await mutation({
    variables: variables,
    update: (store, { data }) => {
      console.log({ data })

      const menuData: any = store.readQuery({
        query: MENUS_BY_TENANT,
        variables: { tenantId: tenantId },
      })

      console.log({ menuData })

      const oldItem = menuData.menusByTenant.find(
        (obj: { menuId: any }) => obj.menuId === data.connectImageToMenu.connection.connect[0].menuId
      )

      const newData = itemReplacer(menuData.menusByTenant, oldItem, data.connectImageToMenu)

      store.writeQuery({
        query: MENUS_BY_TENANT,
        variables: { tenantId: tenantId },
        data: {
          menusByTenant: [...newData],
        },
      })
    },
  })

  return imageData
}

export const handleCreateMenu = async (mutation, args) => {
  const { variables, tenantId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const menuData: any = store.readQuery({
        query: MENUS_BY_TENANT,
        variables: { tenantId: tenantId },
      })

      store.writeQuery({
        query: MENUS_BY_TENANT,
        variables: { tenantId: tenantId },
        data: {
          menusByTenant: [...menuData.menusByTenant, data.createMenu],
        },
      })
    },
  })

  return data
}

export const handleDeleteMenu = async (mutation, args) => {
  const { variables, tenantId } = args
  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const menuData: any = store.readQuery({
        query: MENUS_BY_TENANT,
        variables: { tenantId: tenantId },
      })

      const newData = itemDeleter(menuData.menusByTenant, data.deleteMenu.menu.menuId)

      store.writeQuery({
        query: MENUS_BY_TENANT,
        variables: { tenantId: tenantId },
        data: {
          menusByTenant: [...newData],
        },
      })
    },
  })

  return data
}

export const handlePublishMenu = async (mutation, args) => {
  const { variables, tenantId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const variables = { tenantId: tenantId }

        const menuData: any = store.readQuery({
          query: MENUS_BY_TENANT,
          variables: variables,
        })

        const oldItem = menuData.menusByTenant.find(
          (obj: { menuId: any }) => obj.menuId === data.updateMenu.menu.menuId
        )
        const newData = itemReplacer(menuData.menusByTenant, oldItem, data.updateMenu.menu)

        store.writeQuery({
          query: MENUS_BY_TENANT,
          variables: { tenantId: tenantId },
          data: {
            menusByTenant: [...newData],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}
