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

  const { organizationId, menuId, setFormView } = useUI()

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      const variables = {
        organization_id: organizationId,
        menu_item_id: values.menu_item_id,
        header: values.header,
        sub_header: values.sub_header,
      }
      const args = { variables, organizationId }
      const { data } = await handleCreateChoice(addMenuChoice, args)

      setFormView('CREATE_ITEM_VIEW')
    },

    // $organization_id: ID!
    // $menu_item_id: ID!
    // $header: String!
    // $sub_header: String
  })

  const handleCancel = (event) => {
    event.preventDefault()
    setFormView('CREATE_ITEM_VIEW')
  }

  const hasErrors = () => {
    if (!values.header) return true
    if (!values.sub_header) return true
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
        id="sub_header"
        type="text"
        name="sub_header"
        label="Description"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.sub_header}
        error={errors.choice_sub_header}
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
