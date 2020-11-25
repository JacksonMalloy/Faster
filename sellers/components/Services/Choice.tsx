import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { itemDeleter, itemReplacer } from 'utils'
import { MENU_CHOICES_BY_TENANT } from '../../graphql/queries/menu-choice/menuChoiceByTenant'

export const handleDeleteChoice = async (mutation, args) => {
  const { variables, menuId } = args
  const data = await mutation({
    variables: variables,
    // update: (store, { data }) => {
    //   const menuHeaderData: any = store.readQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { menuId: menuId },
    //   })

    //   console.log({ menuHeaderData })
    //   console.log({ data })

    //   const newData = itemDeleter(menuHeaderData.menuHeadersByMenu, data.removeMenuHeader.menuHeader.headerId)

    //   console.log({ newData })

    //   store.writeQuery({
    //     query: MENU_HEADERS_BY_MENU,
    //     variables: { menuId: menuId },
    //     data: {
    //       menuHeadersByMenu: [...newData],
    //     },
    //   })
    // },
  })

  return data
}

export const handleEditChoice = async (mutation, args) => {
  const { variables, tenantId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const choiceData: any = store.readQuery({
          query: MENU_CHOICES_BY_TENANT,
          variables: { tenantId: tenantId },
        })

        const oldItem = choiceData.menuChoicesByTenant.find(
          (obj: { choiceId: any }) => obj.choiceId === data.editMenuChoice.menuChoice.choiceId
        )

        const newData = itemReplacer(choiceData.menuChoicesByTenant, oldItem, data.editMenuChoice.menuChoice)

        store.writeQuery({
          query: MENU_CHOICES_BY_TENANT,
          variables: { tenantId: tenantId },
          data: {
            menuChoicesByTenant: [...newData],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}

export const handleCreateChoice = async (mutation, args) => {
  const { variables, tenantId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const choiceData: any = store.readQuery({
          query: MENU_CHOICES_BY_TENANT,
          variables: { tenantId: tenantId },
        })

        store.writeQuery({
          query: MENU_CHOICES_BY_TENANT,
          variables: { tenantId: tenantId },
          data: {
            menuChoicesByTenant: [...choiceData.menuChoicesByTenant, data.addMenuChoice],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}
