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
  const { organizationId, menuId, reset, openToast, selectedHeader, setFormView } = useUI()
  const [editMenuHeader] = useMutation(EDIT_MENU_HEADER)
  const initialValues = {
    header: '',
    sub_header: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const { name, sub_header } = values
      const variables = {
        name: name,
        sub_header: sub_header,
        menu_id: menuId,
        menu_header_id: selectedHeader.menu_header_id,
      }
      const args = { variables, menuId }
      const { data } = await handleEditHeader(editMenuHeader, args)

      setFormView('CREATE_ITEM_VIEW')
    },
  })

  useEffect(() => {
    initialize({ name: selectedHeader?.name, sub_header: selectedHeader?.sub_header })
  }, [initialize, selectedHeader])

  const handleCancel = () => {
    setFormView('CREATE_ITEM_VIEW')
  }

  const hasErrors = () => {
    if (!values.name) return true
    if (!values.sub_header) return true
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
        id="sub_header"
        name="sub_header"
        required
        label="Description"
        placeholder="Ex. Flavours of IceCream for everyone to enjoy!"
        value={values.sub_header}
        onChange={handleChange}
        error={errors.sub_header}
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
