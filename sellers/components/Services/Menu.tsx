import { MENUS_BY_TENANT } from 'graphql/queries/menu/menusByTenant'
import { itemDeleter, itemReplacer } from 'utils'

export const handleEditMenu = async (mutation, args) => {
  const { variables, tenantId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const variables = { tenant_id: tenantId }

        const menuData: any = store.readQuery({
          query: MENUS_BY_TENANT,
          variables: variables,
        })

        const oldItem = menuData.menusByTenant.find(
          (obj: { menu_id: any }) => obj.menu_id === data.editMenu.menu.menu_id
        )
        const newData = itemReplacer(menuData.menusByTenant, oldItem, data.editMenu.menu)

        store.writeQuery({
          query: MENUS_BY_TENANT,
          variables: { tenant_id: tenantId },
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
        variables: { tenant_id: tenantId },
      })

      console.log({ menuData })

      const oldItem = menuData.menusByTenant.find(
        (obj: { menu_id: any }) => obj.menu_id === data.connectImageToMenu.connection.connect[0].menu_id
      )

      const newData = itemReplacer(menuData.menusByTenant, oldItem, data.connectImageToMenu)

      store.writeQuery({
        query: MENUS_BY_TENANT,
        variables: { tenant_id: tenantId },
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
        variables: { tenant_id: tenantId },
      })

      store.writeQuery({
        query: MENUS_BY_TENANT,
        variables: { tenant_id: tenantId },
        data: {
          menusByTenant: [...menuData.menusByTenant, data.addMenu],
        },
      })
    },
  })

  return data
}

export const handleDeleteMenu = async (mutation, args) => {
  const { variables, tenant_id } = args
  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const menuData: any = store.readQuery({
        query: MENUS_BY_TENANT,
        variables: { tenant_id: tenant_id },
      })

      const newData = itemDeleter(menuData.menusByTenant, data.removeMenu.menu.menu_id)

      store.writeQuery({
        query: MENUS_BY_TENANT,
        variables: { tenant_id: tenant_id },
        data: {
          menusByTenant: [...newData],
        },
      })
    },
  })

  return data
}

export const handlePublishMenu = async (mutation, args) => {
  const { variables, tenant_id } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const variables = { tenant_id: tenant_id }

        const menuData: any = store.readQuery({
          query: MENUS_BY_TENANT,
          variables: variables,
        })

        const oldItem = menuData.menusByTenant.find(
          (obj: { menu_id: any }) => obj.menu_id === data.editMenu.menu.menu_id
        )
        const newData = itemReplacer(menuData.menusByTenant, oldItem, data.editMenu.menu)

        store.writeQuery({
          query: MENUS_BY_TENANT,
          variables: { tenant_id: tenant_id },
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
