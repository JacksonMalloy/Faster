// GraphQL
import { useMutation } from '@apollo/client'

// Common Components
import { Button } from 'components/common/Button'
import Field from 'components/common/Field'
import useForm from 'components/common/hooks/useForm'
import { useUI } from 'components/Context'
import { Form } from 'components/UI'
import { ADD_MENU_CHOICE } from 'graphql/mutations/menu-choice/addMenuChoice'
import { handleCreateChoice } from 'components/Services/Choice'
import { handleCreateSelection } from 'components/Services/Selection'
import { ADD_MENU_SELECTION } from 'graphql/mutations/menu-selection/addMenuSelection'
import { CurrencyField } from '../common/CurrencyField'

export const CreateSelection = () => {
  const [addMenuSelection, { data }] = useMutation(ADD_MENU_SELECTION)

  const { organizationId, menuId, setFormView } = useUI()

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      const variables = {
        organization_id: organizationId,
        name: values.name,
        value_add: values.value_add,
      }
      const args = { variables, organizationId }
      const { data } = await handleCreateSelection(addMenuSelection, args)

      setFormView('CREATE_ITEM_VIEW')
    },

    // $organization_id: ID!
    // $name: String!
    // $value_add: String
  })

  const handleCancel = (event) => {
    event.preventDefault()
    setFormView('CREATE_ITEM_VIEW')
  }

  const hasErrors = () => {
    if (!values.name) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Selection</h1>

      <Field
        id="name"
        name="name"
        required={true}
        type="text"
        label="Name"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        error={errors.selection_name}
      />
      <CurrencyField
        id="value_add"
        type="text"
        name="value_add"
        label="Additional Cost"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.value_add}
      />
      <div className="form-btns">
        <Button onClick={handleCancel} type="button" value="Cancel">
          Cancel
        </Button>
        <Button type="submit" value="Create" disabled={hasErrors()}>
          Create
        </Button>
      </div>
    </Form>
  )
}
