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

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        id="header"
        name="header"
        required={true}
        type="text"
        label="Header"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.header}
        error={errors.header}
      />
      <Field
        id="sub_header"
        type="text"
        name="sub_header"
        label="Sub Header"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.sub_header}
        error={errors.sub_header}
      />
      <div className="form-btns">
        <Button onClick={handleCancel} type="button" value="Cancel">
          Cancel
        </Button>
        <Button type="button" value="Create">
          Create
        </Button>
      </div>
    </Form>
  )
}
