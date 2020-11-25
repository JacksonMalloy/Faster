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

export const CreateChoice = () => {
  const [addMenuChoice, { data }] = useMutation(ADD_MENU_CHOICE)

  const { tenantId, menuId, setFormView } = useUI()

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      const variables = {
        tenantId: tenantId,
        itemId: values.itemId,
        header: values.header,
        description: values.description,
      }
      const args = { variables, tenantId }
      const { data } = await handleCreateChoice(addMenuChoice, args)

      setFormView('CREATE_ITEM_VIEW')
    },

    // $tenantId: ID!
    // $itemId: ID!
    // $header: String!
    // $description: String
  })

  const handleCancel = (event) => {
    event.preventDefault()
    setFormView('CREATE_ITEM_VIEW')
  }

  const hasErrors = () => {
    if (!values.header) return true
    if (!values.description) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Choice</h1>
      <Field
        id="header"
        name="header"
        required={true}
        type="text"
        label="Name"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.header}
        error={errors.choice_header}
      />
      <Field
        id="description"
        type="text"
        name="description"
        label="Description"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description}
        error={errors.choice_description}
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
