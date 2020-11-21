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
import { CurrencyField } from '../common/CurrencyField'

export const EditSelection = () => {
  const { tenantId, reset, openToast, selectedHeader, selectedSelection, setFormView } = useUI()
  const [editMenuSelection] = useMutation(EDIT_MENU_SELECTION)
  const initialValues = {
    name: '',
    value_add: '',
    selection_id: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const variables = {
        selection_id: selectedSelection.selection_id,
        name: values.name,
        value_add: values.value_add,
      }
      const args = { variables, tenantId }

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

  const hasErrors = () => {
    if (!values.name) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Edit Selection</h1>

      <Field
        id="name"
        name="name"
        required
        label="Name"
        placeholder=""
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        type="text"
      />
      <CurrencyField
        id="value_add"
        name="value_add"
        label="Additional Cost"
        placeholder=""
        value={values.value_add}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.value_add}
        type="text"
      />
      <div className="form-btns">
        <Button onClick={handleCancel} type="reset" value="Reset">
          Cancel
        </Button>
        <Button value="update" disabled={hasErrors()}>
          Update
        </Button>
      </div>
    </Form>
  )
}
