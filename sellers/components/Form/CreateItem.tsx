// GraphQL
import { useMutation, useQuery } from '@apollo/client'
import { ADD_MENU_ITEM } from 'graphql/mutations/menu-item/addMenuItem'
import { CONNECT_IMAGE_TO_MENU_ITEM } from 'graphql/mutations/image/connectImageToMenuItem'
import { CONNECT_MENU_CHOICES_TO_MENU_ITEM } from 'graphql/mutations/menu-choice/connectingMenuChoicesToMenuItem'
import { CONNECT_MENU_SELECTIONS_TO_MENU_CHOICES } from 'graphql/mutations/menu-selection/connectingMenuSelectionToMenuChoice'

// Common Components
import useForm from 'components/common/hooks/useForm'

// Components
import { handleChoicesAndSelections, handleCreateItem } from '../Services'
import Field from '../common/Field'
import { CurrencyField } from '../common/CurrencyField'
import UploadFile from '../UploadFile'
import { Button } from '../common/Button'
import { AddOn } from './AddOn'
import { Form } from '../UI'
import { useUI } from '../Context'
import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { MENU_SELECTIONS_BY_TENANT } from 'graphql/queries/menu-selection/menuSelectionsByTenant'

import DropdownSelect from './DropdownSelect'

export const CreateItem = () => {
  const [addMenuItem] = useMutation(ADD_MENU_ITEM)
  const [connectImageToMenuItem] = useMutation(CONNECT_IMAGE_TO_MENU_ITEM)
  const [connectMenuChoicesToMenuItem] = useMutation(CONNECT_MENU_CHOICES_TO_MENU_ITEM)
  const [connectMenuSelectionsToMenuChoice] = useMutation(CONNECT_MENU_SELECTIONS_TO_MENU_CHOICES)

  const {
    formHeader,
    formChoices,
    formSelections,
    setFormAddOns,
    formAddOns,
    tenantId,
    selectedMenu,
    menuId,
    reset,
  } = useUI()

  const { data: headerData, loading: headerDataLoading, error: headerDataError } = useQuery(MENU_HEADERS_BY_MENU, {
    variables: { menu_id: menuId },
  })

  const { data: selectionData, loading: selectionDataLoading, error: selectionDataError } = useQuery(
    MENU_SELECTIONS_BY_TENANT,
    {
      variables: {
        tenant_id: tenantId,
      },
    }
  )

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      const { description, price, title } = values
      const { header_id } = formHeader

      const variables = {
        menu_id: menuId,
        name: title,
        description: description,
        base_price: price,
        header_id: header_id,
      }

      const args = { variables, menuId }
      const { data } = await handleCreateItem(addMenuItem, args)

      const {
        addMenuItem: {
          menu_item: { item_id },
        },
      } = data

      // If any choices have been made connect them and their selections
      if (formChoices.length !== 0) {
        const arrayOfMenuChoiceIds = formChoices.map((choice: { choice_id: any }) => choice.choice_id)

        const variables = {
          item_id: item_id,
          choice_ids: arrayOfMenuChoiceIds,
        }

        const args = { variables }

        const choiceSelectionData = await handleChoicesAndSelections(connectMenuChoicesToMenuItem, args)
          .then(({ data }) => {
            // Loop over choices array in state to determine how to connect selections
            for (let choice of formChoices) {
              const arrayOfMenuSelectionIds = formSelections
                .filter((selection: { id: any }) => selection.id === choice.id)
                .map((selection: { selection_id: any }) => selection.selection_id)

              connectMenuSelectionsToMenuChoice({
                variables: {
                  choice_id: choice.choice_id,
                  selection_ids: arrayOfMenuSelectionIds,
                },
              })
            }
          })
          .catch((error: any) => {
            console.log(error)
          })

        console.log({ choiceSelectionData })

        return choiceSelectionData
      }

      // Reset all fields
      reset()

      // Would like to handle this more elegantly
      values.description = ''
      values.price = ''
      values.title = ''
    },
  })

  // useEffect(() => {
  //   if (data && data.addMenuItem && state.image) {
  //     const variables = {
  //       image_id: state.image.uploadImage.image_id,
  //       item_id: data.addMenuItem.item_id,
  //     }

  //     console.log({ variables })

  //     connectImageToMenuItem({
  //       variables: variables,
  //       update: (store, { data }) => {
  //         try {
  //           const menuItemData = store.readQuery({
  //             query: MENU,
  //             variables: { menu_id: menu_id },
  //           })

  //           console.log({ menuItemData })

  //           const itemReplacer = (array, oldItem, newItem) =>
  //             array.map((item) => (item === oldItem ? newItem : item))

  //           const oldItem = menuItemData.menu.menu_items.find(
  //             (obj) =>
  //               obj.item_id === data.connectImageToMenuItem.item_id
  //           )

  //           const newData = itemReplacer(
  //             menuItemData.menu.menu_items,
  //             oldItem,
  //             data.connectImageToMenuItem
  //           )

  //           console.log({ newData })

  //           store.writeQuery({
  //             query: MENU,
  //             variables: { menu_id: menu_id },
  //             data: {
  //               menu: {
  //                 menu_items: [...newData],
  //               },
  //             },
  //           })
  //         } catch (error) {
  //           console.log(error)
  //         }
  //       },
  //     })
  //   }
  // }, [data])

  const generateAddOn = () => {
    setFormAddOns()
  }

  const hasErrors = () => {
    if (!values.title) return true
    if (!values.description) return true
    if (!values.price) return true
    if (!formHeader) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Item</h1>

      <section>
        {headerData && headerData.menuHeadersByMenu && (
          <DropdownSelect
            items={headerData.menuHeadersByMenu}
            title="Select a value"
            label={'Header'}
            multiSelect={false}
          />
        )}
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

        <AddOn selectionData={selectionData} />

        <div className="form-btns">
          <div />
          <Button onClick={generateAddOn} type="button" value="choice">
            Create Add On
          </Button>
        </div>

        <hr />

        <div className="form-btns">
          <div />

          <Button value="create" disabled={hasErrors()}>
            Create
          </Button>
        </div>
      </section>
    </Form>
  )
}
