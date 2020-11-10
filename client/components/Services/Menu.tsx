import { MENUS_BY_ORGANIZATION } from 'graphql/queries/menu/menusByOrganization'
import { itemDeleter, itemReplacer } from 'utils'

export const handleEditMenu = async (mutation, args) => {
  const { variables, organizationId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const variables = { organization_id: organizationId }

        const menuData: any = store.readQuery({
          query: MENUS_BY_ORGANIZATION,
          variables: variables,
        })

        const oldItem = menuData.menusByOrganization.find(
          (obj: { menu_id: any }) => obj.menu_id === data.editMenu.menu.menu_id
        )
        const newData = itemReplacer(menuData.menusByOrganization, oldItem, data.editMenu.menu)

        store.writeQuery({
          query: MENUS_BY_ORGANIZATION,
          variables: { organization_id: organizationId },
          data: {
            menusByOrganization: [...newData],
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
  const { variables, organizationId } = args

  const imageData = await mutation({
    variables: variables,
    update: (store, { data }) => {
      console.log({ data })

      const menuData: any = store.readQuery({
        query: MENUS_BY_ORGANIZATION,
        variables: { organization_id: organizationId },
      })

      console.log({ menuData })

      const oldItem = menuData.menusByOrganization.find(
        (obj: { menu_id: any }) => obj.menu_id === data.connectImageToMenu.connection.connect[0].menu_id
      )

      const newData = itemReplacer(menuData.menusByOrganization, oldItem, data.connectImageToMenu)

      store.writeQuery({
        query: MENUS_BY_ORGANIZATION,
        variables: { organization_id: organizationId },
        data: {
          menusByOrganization: [...newData],
        },
      })
    },
  })

  return imageData
}

export const handleCreateMenu = async (mutation, args) => {
  const { variables, organizationId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const menuData: any = store.readQuery({
        query: MENUS_BY_ORGANIZATION,
        variables: { organization_id: organizationId },
      })

      store.writeQuery({
        query: MENUS_BY_ORGANIZATION,
        variables: { organization_id: organizationId },
        data: {
          menusByOrganization: [...menuData.menusByOrganization, data.addMenu],
        },
      })
    },
  })

  return data
}

export const handleDeleteMenu = async (mutation, args) => {
  const { variables, organization_id } = args
  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const menuData: any = store.readQuery({
        query: MENUS_BY_ORGANIZATION,
        variables: { organization_id: organization_id },
      })

      const newData = itemDeleter(menuData.menusByOrganization, data.removeMenu.menu.menu_id)

      store.writeQuery({
        query: MENUS_BY_ORGANIZATION,
        variables: { organization_id: organization_id },
        data: {
          menusByOrganization: [...newData],
        },
      })
    },
  })

  return data
}

export const handlePublishMenu = async (mutation, args) => {
  const { variables, organization_id } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const variables = { organization_id: organization_id }

        const menuData: any = store.readQuery({
          query: MENUS_BY_ORGANIZATION,
          variables: variables,
        })

        const oldItem = menuData.menusByOrganization.find(
          (obj: { menu_id: any }) => obj.menu_id === data.editMenu.menu.menu_id
        )
        const newData = itemReplacer(menuData.menusByOrganization, oldItem, data.editMenu.menu)

        store.writeQuery({
          query: MENUS_BY_ORGANIZATION,
          variables: { organization_id: organization_id },
          data: {
            menusByOrganization: [...newData],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}
