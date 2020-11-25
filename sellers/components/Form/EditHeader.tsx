import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import useForm from 'components/common/hooks/useForm'
import { useMutation } from '@apollo/client'
import { Form } from '../UI'
import { useUI } from '../Context'
import { useEffect } from 'react'
import { EDIT_MENU_HEADER } from 'graphql/mutations/menu-header/editMenuHeader'
import { handleEditHeader } from 'components/Services/Header'

export const EditHeader = () => {
  const { tenantId, menuId, reset, openToast, selectedHeader, setFormView } = useUI()
  const [editMenuHeader] = useMutation(EDIT_MENU_HEADER)
  const initialValues = {
    header: '',
    description: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const { name, description } = values
      const variables = {
        name: name,
        description: description,
        menuId: menuId,
        headerId: selectedHeader.headerId,
      }
      const args = { variables, menuId }
      const { data } = await handleEditHeader(editMenuHeader, args)

      setFormView('CREATE_ITEM_VIEW')
    },
  })

  useEffect(() => {
    initialize({ name: selectedHeader?.name, description: selectedHeader?.description })
  }, [initialize, selectedHeader])

  const handleCancel = () => {
    setFormView('CREATE_ITEM_VIEW')
  }

  const hasErrors = () => {
    if (!values.name) return true
    if (!values.description) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Edit Header</h1>

      <Field
        id="name"
        name="name"
        required
        label="Name"
        placeholder="Ex. Ice Cream"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
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
        error={errors.description}
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
