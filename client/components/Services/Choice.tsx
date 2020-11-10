import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { itemDeleter, itemReplacer } from 'utils'

export const handleDeleteChoice = async (mutation, args) => {
  const { variables, menuId } = args
  const data = await mutation({
    variables: variables,
    // update: (store, { data }) => {
    //   const menuHeaderData: any = store.readQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { menu_id: menuId },
    //   })

    //   console.log({ menuHeaderData })
    //   console.log({ data })

    //   const newData = itemDeleter(menuHeaderData.menuHeadersByMenu, data.removeMenuHeader.menu_header.menu_header_id)

    //   console.log({ newData })

    //   store.writeQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { menu_id: menuId },
    //     data: {
    //       menuHeadersByMenu: [...newData],
    //     },
    //   })
    // },
  })

  return data
}

export const handleEditChoice = async (mutation, args) => {
  const { variables, menuId } = args

  const data = await mutation({
    variables: variables,
    // update: (store, { data }) => {
    //   try {
    //     const variables = { menu_id: menuId }

    //     const menuData: any = store.readQuery({
    //       query: MENU_HEADERS_BY_MENU,
    //       variables: variables,
    //     })

    //     const oldItem = menuData.menusByOrganization.find(
    //       (obj: { menu_id: any }) => obj.menu_id === data.editMenu.menu.menu_id
    //     )
    //     const newData = itemReplacer(menuData.menusByOrganization, oldItem, data.editMenu.menu)

    //     store.writeQuery({
    //       query: MENU_HEADERS_BY_MENU,
    //       variables: { menu_id: menuId },
    //       data: {
    //         menuHeadersByMenu: [...newData],
    //       },
    //     })
    //   } catch (error) {
    //     console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
    //   }
    // },
  })

  return data
}

export const handleCreateChoice = async (mutation, args) => {
  const { variables, menuId } = args

  const data = await mutation({
    variables: variables,
    // update: (store, { data }) => {
    //   try {
    //     const variables = { menu_id: menuId }

    //     const menuData: any = store.readQuery({
    //       query: MENU_HEADERS_BY_MENU,
    //       variables: variables,
    //     })

    //     const oldItem = menuData.menusByOrganization.find(
    //       (obj: { menu_id: any }) => obj.menu_id === data.editMenu.menu.menu_id
    //     )
    //     const newData = itemReplacer(menuData.menusByOrganization, oldItem, data.editMenu.menu)

    //     store.writeQuery({
    //       query: MENU_HEADERS_BY_MENU,
    //       variables: { menu_id: menuId },
    //       data: {
    //         menuHeadersByMenu: [...newData],
    //       },
    //     })
    //   } catch (error) {
    //     console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
    //   }
    // },
  })

  return data
}
