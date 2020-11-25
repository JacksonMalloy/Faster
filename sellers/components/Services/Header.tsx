import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { itemDeleter, itemReplacer } from 'utils'

export const handleDeleteHeader = async (mutation, args) => {
  const { variables, menuId } = args
  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const menuHeaderData: any = store.readQuery({
        query: MENU_HEADERS_BY_MENU,
        variables: { menuId: menuId },
      })

      const newData = itemDeleter(menuHeaderData.menuHeadersByMenu, data.removeMenuHeader.menuHeader.headerId)

      store.writeQuery({
        query: MENU_HEADERS_BY_MENU,
        variables: { menuId: menuId },
        data: {
          menuHeadersByMenu: [...newData],
        },
      })
    },
  })

  return data
}

export const handleEditHeader = async (mutation, args) => {
  const { variables, menuId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const headerData: any = store.readQuery({
          query: MENU_HEADERS_BY_MENU,
          variables: { menuId: menuId },
        })

        const oldItem = headerData.menuHeadersByMenu.find(
          (obj: { headerId: any }) => obj.headerId === data.editMenuHeader.menuHeader.headerId
        )

        const newData = itemReplacer(headerData.menuHeadersByMenu, oldItem, data.editMenuHeader.menuHeader)

        store.writeQuery({
          query: MENU_HEADERS_BY_MENU,
          variables: { menuId: menuId },
          data: {
            menuHeadersByMenu: [...newData],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}
