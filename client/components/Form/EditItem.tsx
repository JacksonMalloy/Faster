// GraphQL
import { useMutation, useQuery } from '@apollo/client'
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
import { handleEditMenu } from 'components/Services/Menu'
import { handleConnectingImageToItem, handleMenuChoiceItemConnections } from '../Services'
import { useUI } from '../Context'
import { Form } from '../UI'
import React from 'react'
import Field from '../common/Field'
import UploadFile from '../UploadFile'
import { Button } from '../common/Button'
import DropdownSelectHeader from '../Menu/header/DropdownSelect'
import { ChoiceGroup } from '../Menu/choice/ChoiceGroup'
import { CurrencyField } from '../common/CurrencyField'
import { useEffect } from 'react'
import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { MENU_SELECTIONS_BY_ORGANIZATION } from 'graphql/queries/menu-selection/menuSelectionsByOrganization'

export const EditItem = () => {
  // State
  const { organizationId, formImage, reset, openToast, selectedItem, setFormView } = useUI()

  // Mutations
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

  const { data: headerData, loading: headerDataLoading, error: headerDataError } = useQuery(MENU_HEADERS_BY_MENU, {
    variables: { menu_id: selectedItem.menu_id },
  })

  const { data: selectionData, loading: selectionDataLoading, error: selectionDataError } = useQuery(
    MENU_SELECTIONS_BY_ORGANIZATION,
    {
      variables: {
        organization_id: organizationId,
      },
    }
  )

  const initialValues = {
    title: '',
    description: '',
    price: '',
  }

  const { values, errors, handleChange, handleBlur, handleSubmit, initialize } = useForm({
    initialValues,
    onSubmit: async ({ errors, values }) => {
      const { title, description, price } = values
      const { menu_item_id, menu_id } = selectedItem
      const [{ menu_header_id }] = headerData

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
      if (formImage) {
        const connectingImageVariables = {
          image_id: formImage.uploadImage.image_id,
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

            reset()
            setFormView('EDIT_ITEM_VIEW')
          })
          .catch((error) => console.log(error))
      }
    },
  })

  const handleCancel = () => {
    setFormView('CREATE_ITEM_VIEW')
    reset()
  }

  useEffect(() => {
    initialize({ title: selectedItem?.name, description: selectedItem?.description, price: selectedItem?.base_price })
  }, [initialize, selectedItem])

  return (
    <Form onSubmit={handleSubmit}>
      <section>
        <Field
          id="title"
          name="title"
          type="name"
          required
          label="Item Title"
          placeholder=""
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          error={errors.title}
        />
        <Field
          id="description"
          name="description"
          type="textarea"
          label="Item Description"
          placeholder=""
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          error={errors.description}
        />

        <CurrencyField
          placeholder="$0.00"
          type="text"
          label="Item Price"
          id="price"
          name="price"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
          error={errors.price}
        />
        <section className="form-img">
          <label>Item Image (Optional)</label>
          <UploadFile />
        </section>
        <div className="form-btns">
          <Button onClick={handleCancel} type="reset" value="Reset">
            Cancel
          </Button>
          <Button value="update">Update</Button>
        </div>
      </section>
      <section className="ptop">
        {headerData && headerData.menuHeadersByMenu && (
          <DropdownSelectHeader
            items={headerData.menuHeadersByMenu}
            title="Select a value"
            label={'Header'}
            multiSelect={false}
          />
        )}

        <ChoiceGroup selectionData={selectionData} />
        <div>
          {/* <Button onClick={handleChoice} type="button" value="choice">
            Add A Choice
          </Button> */}
        </div>
      </section>
    </Form>
  )
}
