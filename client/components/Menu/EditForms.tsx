// Global State
import { useContext, useEffect } from 'react'
import { reset } from 'stores/userActions'
import UserContext from 'stores/UserContext'

// GraphQL
import { useMutation } from '@apollo/client'
import { CONNECT_IMAGE_TO_MENU_ITEM } from 'graphql/mutations/image/connectImageToMenuItem'
import { EDIT_MENU_ITEM } from 'graphql/mutations/menu-item/editMenuItem'
import { EDIT_MENU_HEADER } from 'graphql/mutations/menu-header/editMenuHeader'
import { REMOVE_MENU_CHOICES_MENU_ITEMS_CONNECTION } from 'graphql/mutations/menu-choice/removeMenuChoicesMenuItemsConnection'
import { REMOVE_MENU_SELECTIONS_MENU_CHOICES_CONNECTION } from 'graphql/mutations/menu-selection/removeMenuSelectionsMenuChoicesConntection'
import { CONNECT_MENU_CHOICES_TO_MENU_ITEM } from 'graphql/mutations/menu-choice/connectingMenuChoicesToMenuItem'
import { CONNECT_MENU_SELECTIONS_TO_MENU_CHOICES } from 'graphql/mutations/menu-selection/connectingMenuSelectionToMenuChoice'
import { MENU_ITEMS_BY_MENU } from 'graphql/queries/menu-item/menuItemsByMenu'

// Common Components
import useForm from 'components/common/hooks/useForm'

// Components
import { ItemForm } from './ItemForm'
import ChoiceForm from './choice/ChoiceForm'
import HeaderForm from '../Form/CreateHeader'
import SelectionForm from './selection/SelectionForm'
import { MENU_ITEM } from 'graphql/queries/menu-item/menuItem'
import { handleEditMenu } from 'components/Services/Menu'
import { handleConnectingImageToItem, handleMenuChoiceItemConnections } from './Mutations'

export const EditForms = ({ setIsOpen, item, headerData, selectionData, menu_item_id }) => {
  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {
    console.log({ item })
  }, [])

  const [editMenuHeader] = useMutation(EDIT_MENU_HEADER)

  const [editMenuItem, { error: editItemError }] = useMutation(EDIT_MENU_ITEM)

  const [connectImageToMenuItem, { error: connectImageToItemError }] = useMutation(CONNECT_IMAGE_TO_MENU_ITEM)
  const [removeMenuChoicesMenuItemsConnection, { error: removeChoicesToItemsError }] = useMutation(
    REMOVE_MENU_CHOICES_MENU_ITEMS_CONNECTION
  )
  const [removeMenuSelectionsMenuChoicesConnection, { error: removeSelectionsToChoiceError }] = useMutation(
    REMOVE_MENU_SELECTIONS_MENU_CHOICES_CONNECTION
  )
  const [connectMenuChoiceToMenuItem, { error: connectChoicesToItemError }] = useMutation(
    CONNECT_MENU_CHOICES_TO_MENU_ITEM
  )
  const [connectMenuSelectionToMenuChoice, { error: connectSelectionsToChoicesError }] = useMutation(
    CONNECT_MENU_SELECTIONS_TO_MENU_CHOICES
  )

  const { base_price, name, description } = item

  const initialValues = {
    title: name,
    description: description,
    price: base_price,
  }

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues,
    onSubmit: async ({ errors, values }) => {
      const { title, description, price } = values
      const { menu_item_id, menu_id } = item
      const { header } = state

      const [{ menu_header_id }] = header
      const variables = {
        menu_item_id: menu_item_id,
        menu_header_id: menu_header_id,
        menu_id: menu_id,
        name: title,
        base_price: price,
        description: description,
      }

      const args = { variables, menu_id }

      const handleData = await handleEditMenu(editMenuItem, args)

      // UPDATE IMAGE
      if (state.image) {
        const connectingImageVariables = {
          image_id: state.image.uploadImage.image_id,
          menu_item_id: handleData.editMenuItem.menu_item_id,
        }
        const connectingImageArgs = { variables: connectingImageVariables, menu_id }
        await handleConnectingImageToItem(connectImageToMenuItem, connectingImageArgs)

        const mutations = {
          removeMenuChoicesMenuItemsConnection,
          removeMenuSelectionsMenuChoicesConnection,
          connectMenuChoiceToMenuItem,
          connectMenuSelectionToMenuChoice,
        }

        const { choiceGroups, choices, selections } = state

        const CSargs = { item, choiceGroups, choices, selections }

        await handleMenuChoiceItemConnections(mutations, CSargs)
          .then(() => {
            console.log({ editItemError })
            console.log({ connectImageToItemError })
            console.log({ removeChoicesToItemsError })
            console.log({ removeSelectionsToChoiceError })
            console.log({ connectChoicesToItemError })
            console.log({ connectSelectionsToChoicesError })

            dispatch(reset())
            setIsOpen(false)
          })
          .catch((error) => console.log(error))
      }
    },
  })

  return (
    <>
      {state.formPhase === 'menu-item' ? (
        <ItemForm
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
          errors={errors}
          headerData={headerData}
          selectionData={selectionData}
          item={item}
          setIsOpen={setIsOpen}
        />
      ) : state.formPhase === 'menu-header' ? (
        // HEADER FORM
        <HeaderForm menu_id={item.menu_id} />
      ) : state.formPhase === 'menu-choice' ? (
        // CHOICE FORM
        <ChoiceForm />
      ) : (
        // SELECTION FORM
        <SelectionForm selectionData={selectionData} />
      )}
    </>
  )
}
