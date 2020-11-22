import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { itemDeleter, itemReplacer } from 'utils'
import { MENU_CHOICES_BY_ORGANIZATION } from '../../graphql/queries/menu-choice/menuChoiceByOrganization'

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
  const { variables, organizationId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const choiceData: any = store.readQuery({
          query: MENU_CHOICES_BY_ORGANIZATION,
          variables: { organization_id: organizationId },
        })

        const oldItem = choiceData.menuChoicesByOrganization.find(
          (obj: { menu_choice_id: any }) => obj.menu_choice_id === data.editMenuChoice.menu_choice.menu_choice_id
        )

        const newData = itemReplacer(choiceData.menuChoicesByOrganization, oldItem, data.editMenuChoice.menu_choice)

        store.writeQuery({
          query: MENU_CHOICES_BY_ORGANIZATION,
          variables: { organization_id: organizationId },
          data: {
            menuChoicesByOrganization: [...newData],
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
  const { variables, organizationId } = args

  const data = await mutation({
    variables: variables,
    update: (store, { data }) => {
      try {
        const choiceData: any = store.readQuery({
          query: MENU_CHOICES_BY_ORGANIZATION,
          variables: { organization_id: organizationId },
        })

        store.writeQuery({
          query: MENU_CHOICES_BY_ORGANIZATION,
          variables: { organization_id: organizationId },
          data: {
            menuChoicesByOrganization: [...choiceData.menuChoicesByOrganization, data.addMenuChoice],
          },
        })
      } catch (error) {
        console.log(`THERE WAS AN ERROR UPDATING THE CACHE: `, error)
      }
    },
  })

  return data
}
