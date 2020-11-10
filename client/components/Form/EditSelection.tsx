import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import useForm from 'components/common/hooks/useForm'
import { useMutation } from '@apollo/client'
import { Form } from '../UI'
import { useUI } from '../Context'
import { useEffect } from 'react'

import { handleEditChoice } from 'components/Services/Choice'
import { EDIT_MENU_SELECTION } from 'graphql/mutations/menu-selection/editMenuSelection'
import { handleEditSelection } from 'components/Services/Selection'

export const EditSelection = () => {
  const { organizationId, reset, openToast, selectedHeader, selectedSelection, setFormView } = useUI()
  const [editMenuSelection] = useMutation(EDIT_MENU_SELECTION)
  const initialValues = {
    name: '',
    value_add: '',
    menu_selection_id: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const variables = {
        menu_selection_id: selectedSelection.menu_selection_id,
        name: values.name,
        value_add: values.value_add,
      }
      const args = { variables, organizationId }

      const { data } = await handleEditSelection(editMenuSelection, args)

      setFormView('CREATE_ITEM_VIEW')
    },
  })

  useEffect(() => {
    initialize({ name: selectedSelection?.name, value_add: selectedSelection?.value_add })
    // eslint-disable-next-line
  }, [initialize, selectedHeader])

  const handleCancel = () => {
    setFormView('CREATE_ITEM_VIEW')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        id="name"
        name="name"
        required
        label="Name"
        placeholder="Add Ketchup"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        type="text"
      />
      <Field
        id="value_add"
        name="value_add"
        required
        label="Value Added"
        placeholder="Ex. $2.99"
        value={values.value_add}
        onChange={handleChange}
        error={errors.value_add}
        type="text"
      />
      <div className="form-btns">
        <Button onClick={handleCancel} type="reset" value="Reset">
          Cancel
        </Button>
        <Button value="update">Update</Button>
      </div>
    </Form>
  )
}
