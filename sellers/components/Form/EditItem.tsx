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
import { handleConnectingImageToItem, handleEditItem, handleMenuChoiceItemConnections } from '../Services'
import { useUI } from '../Context'
import { Form } from '../UI'
import React from 'react'
import Field from '../common/Field'
import UploadFile from '../UploadFile'
import { Button } from '../common/Button'
import DropdownSelect from './DropdownSelect'
import { AddOn } from './AddOn'
import { CurrencyField } from '../common/CurrencyField'
import { useEffect } from 'react'
import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { MENU_SELECTIONS_BY_TENANT } from 'graphql/queries/menu-selection/menuSelectionsByTenant'

export const EditItem = () => {
  // State
  const {
    tenantId,
    formImage,
    reset,
    openToast,
    selectedItem,
    setFormView,
    setFormAddOns,
    formHeader,
    formAddOns,
    formChoices,
    formSelections,
  } = useUI()

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
    MENU_SELECTIONS_BY_TENANT,
    {
      variables: {
        tenant_id: tenantId,
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
      const { item_id, menu_id } = selectedItem
      const headerId = formHeader ? formHeader.header_id : null

      const variables = {
        item_id: item_id,
        header_id: headerId,
        menu_id: menu_id,
        name: title,
        base_price: price,
        description: description,
      }

      const args = { variables, menu_id }

      const handleData = await handleEditItem(editMenuItem, args)
      console.log({ handleData })
      console.log({ selectedItem })

      const mutations = {
        removeMenuChoicesMenuItemsConnection,
        removeMenuSelectionsMenuChoicesConnection,
        connectMenuChoiceToMenuItem,
        connectMenuSelectionToMenuChoice,
      }

      const CSargs = { selectedItem, formAddOns, formChoices, formSelections }

      await handleMenuChoiceItemConnections(mutations, CSargs)
        .then(() => {
          // console.log({ editItemError })
          // console.log({ connectImageToItemError })
          // console.log({ removeChoicesToItemsError })
          // console.log({ removeSelectionsToChoiceError })
          // console.log({ connectChoicesToItemError })
          // console.log({ connectSelectionsToChoicesError })
        })
        .catch((error) => console.log(error))

      setFormView('CREATE_ITEM_VIEW')
      reset()
    },
  })

  const handleCancel = () => {
    setFormView('CREATE_ITEM_VIEW')
    reset()
  }

  const generateAddOn = () => {
    console.log('clicked')
    setFormAddOns()
  }

  useEffect(() => {
    initialize({ title: selectedItem?.name, description: selectedItem?.description, price: selectedItem?.base_price })
  }, [initialize, selectedItem])

  const hasErrors = () => {
    if (!values.title) return true
    if (!values.description) return true
    if (!values.price) return true
    if (!formHeader) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Edit Item</h1>

      {headerData && headerData.menuHeadersByMenu && (
        <DropdownSelect
          items={headerData.menuHeadersByMenu}
          title="Select a value"
          label={'Header'}
          multiSelect={false}
        />
      )}

      <section>
        <Field
          id="title"
          name="title"
          type="name"
          required
          label="Name"
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
          label="Description"
          placeholder=""
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          error={errors.description}
        />

        <CurrencyField
          placeholder="$0.00"
          type="text"
          label="Price"
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
      </section>
      <section>
        <AddOn selectionData={selectionData} />

        <div className="form-btns">
          <div />
          <Button onClick={generateAddOn} type="button" value="choice">
            Create Add On
          </Button>
        </div>

        <hr />

        <div className="form-btns">
          <Button onClick={handleCancel} type="reset" value="Reset">
            Cancel
          </Button>
          <Button value="update" disabled={hasErrors()}>
            Update
          </Button>
        </div>
      </section>
    </Form>
  )
}
