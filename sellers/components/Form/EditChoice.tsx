import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import useForm from 'components/common/hooks/useForm'
import { useMutation } from '@apollo/client'
import { Form } from '../UI'
import { useUI } from '../Context'
import { useEffect } from 'react'
import { handleEditHeader } from 'components/Services/Header'
import { EDIT_MENU_CHOICE } from 'graphql/mutations/menu-choice/updateMenuChoice'
import { handleEditChoice } from 'components/Services/Choice'

export const EditChoice = () => {
  const { tenantId, reset, openToast, selectedHeader, selectedChoice, setFormView } = useUI()
  const [updateMenuChoice] = useMutation(EDIT_MENU_CHOICE)
  const initialValues = {
    header: '',
    description: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const variables = {
        header: values.header,
        description: values.description,
        choiceId: selectedChoice.choiceId,
      }
      const args = { variables, tenantId }
      const { data } = await handleEditChoice(updateMenuChoice, args)

      setFormView('CREATE_ITEM_VIEW')
    },
  })

  useEffect(() => {
    initialize({ header: selectedChoice?.header, description: selectedChoice?.description })
    // eslint-disable-next-line
  }, [initialize, selectedHeader])

  const handleCancel = () => {
    setFormView('CREATE_ITEM_VIEW')
  }

  const hasErrors = () => {
    if (!values.header) return true
    if (!values.description) return true
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
        id="description"
        name="description"
        required
        label="Description"
        placeholder="Ex. Flavours of IceCream for everyone to enjoy!"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.choice_description}
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
