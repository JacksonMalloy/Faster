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
    // $menu_choice_id: ID
    // $menu_item_id: ID
    // $name: String!
    // $value_add: String
  })

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Selection</h1>

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
        <div />
        <Button type="button" value="Create">
          Create
        </Button>
      </div>
    </Form>
  )
}
