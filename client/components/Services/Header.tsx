import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { itemDeleter } from 'utils'

export const handleDeleteHeader = async (mutation, args) => {
  const { variables, menuId } = args
  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      const menuHeaderData: any = store.readQuery({
        query: MENU_HEADERS_BY_MENU,
        variables: { menu_id: menuId },
      })

      console.log({ menuHeaderData })
      console.log({ data })

      const newData = itemDeleter(menuHeaderData.menuHeadersByMenu, data.removeMenuHeader.menu_header.menu_header_id)

      console.log({ newData })

      store.writeQuery({
        query: MENU_HEADERS_BY_MENU,
        variables: { menu_id: menuId },
        data: {
          menuHeadersByMenu: [...newData],
        },
      })
    },
  })

  return data
}
