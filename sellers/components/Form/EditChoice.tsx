import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import useForm from 'components/common/hooks/useForm'
import { useMutation } from '@apollo/client'
import { Form } from '../UI'
import { useUI } from '../Context'
import { useEffect } from 'react'
import { handleEditHeader } from 'components/Services/Header'
import { EDIT_MENU_CHOICE } from 'graphql/mutations/menu-choice/editMenuChoice'
import { handleEditChoice } from 'components/Services/Choice'

export const EditChoice = () => {
  const { tenantId, reset, openToast, selectedHeader, selectedChoice, setFormView } = useUI()
  const [editMenuChoice] = useMutation(EDIT_MENU_CHOICE)
  const initialValues = {
    header: '',
    sub_header: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const variables = {
        header: values.header,
        sub_header: values.sub_header,
        choice_id: selectedChoice.choice_id,
      }
      const args = { variables, tenantId }
      const { data } = await handleEditChoice(editMenuChoice, args)

      setFormView('CREATE_ITEM_VIEW')
    },
  })

  useEffect(() => {
    initialize({ header: selectedChoice?.header, sub_header: selectedChoice?.sub_header })
    // eslint-disable-next-line
  }, [initialize, selectedHeader])

  const handleCancel = () => {
    setFormView('CREATE_ITEM_VIEW')
  }

  const hasErrors = () => {
    if (!values.header) return true
    if (!values.sub_header) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Edit Choice</h1>

      <Field
        id="header"
        name="header"
        required
        label="Name"
        placeholder="Ex. Ice Cream"
        value={values.header}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.choice_header}
        type="text"
      />
      <Field
        id="sub_header"
        name="sub_header"
        required
        label="Description"
        placeholder="Ex. Flavours of IceCream for everyone to enjoy!"
        value={values.sub_header}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.choice_sub_header}
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
