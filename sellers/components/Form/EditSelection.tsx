import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import useForm from 'components/common/hooks/useForm'
import { useMutation } from '@apollo/client'
import { Form } from '../UI'
import { useUI } from '../Context'
import { useEffect } from 'react'

import { handleEditChoice } from 'components/Services/Choice'
import { EDIT_MENU_SELECTION } from 'graphql/mutations/menu-selection/updateMenuSelection'
import { handleEditSelection } from 'components/Services/Selection'
import { CurrencyField } from '../common/CurrencyField'

export const EditSelection = () => {
  const { tenantId, reset, openToast, selectedHeader, selectedSelection, setSecondaryFormView } = useUI()
  const [updateMenuSelection] = useMutation(EDIT_MENU_SELECTION)
  const initialValues = {
    name: '',
    valueAdd: '',
    selectionId: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const variables = {
        selectionId: selectedSelection.selectionId,
        name: values.name,
        valueAdd: values.valueAdd,
      }
      const args = { variables, tenantId }

      const { data } = await handleEditSelection(updateMenuSelection, args)

      setSecondaryFormView('')
    },
  })

  useEffect(() => {
    initialize({ name: selectedSelection?.name, valueAdd: selectedSelection?.valueAdd })
    // eslint-disable-next-line
  }, [initialize, selectedHeader])

  const handleCancel = () => {
    setSecondaryFormView('')
  }

  const hasErrors = () => {
    if (!values.name) return true
  }

  return (
    <Form onSubmit={handleSubmit} secondary>
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
        id="valueAdd"
        name="valueAdd"
        label="Additional Cost"
        placeholder=""
        value={values.valueAdd}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.valueAdd}
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
