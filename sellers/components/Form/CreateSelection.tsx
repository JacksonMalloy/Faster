// GraphQL
import { useMutation } from '@apollo/client'

// Common Components
import { Button } from 'components/common/Button'
import Field from 'components/common/Field'
import useForm from 'components/common/hooks/useForm'
import { useUI } from 'components/Context'
import { Form } from 'components/UI'
import { ADD_MENU_CHOICE } from 'graphql/mutations/menu-choice/createMenuChoice'
import { handleCreateChoice } from 'components/Services/Choice'
import { handleCreateSelection } from 'components/Services/Selection'
import { ADD_MENU_SELECTION } from 'graphql/mutations/menu-selection/createMenuSelection'
import { CurrencyField } from '../common/CurrencyField'

export const CreateSelection = () => {
  const [createMenuSelection, { data }] = useMutation(ADD_MENU_SELECTION)

  const { tenantId, menuId, setFormView } = useUI()

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      const variables = {
        tenantId: tenantId,
        name: values.name,
        valueAdd: values.valueAdd,
      }
      const args = { variables, tenantId }
      const { data } = await handleCreateSelection(createMenuSelection, args)

      setFormView('CREATE_ITEM_VIEW')
    },

    // $tenantId: ID!
    // $name: String!
    // $valueAdd: String
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
        id="valueAdd"
        type="text"
        name="valueAdd"
        label="Additional Cost"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.valueAdd}
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
