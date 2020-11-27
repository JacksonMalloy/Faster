import styled from 'styled-components'

// GraphQL
import { useMutation } from '@apollo/client'
import { ADD_MENU_HEADER } from 'graphql/mutations/menu-header/createMenuHeader'
import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'

// Common Components
import { Button } from 'components/common/Button'
import Field from 'components/common/Field'
import useForm from 'components/common/hooks/useForm'
import { useUI } from 'components/Context'
import { Form } from 'components/UI'

export const CreateHeader = () => {
  const [createMenuHeader] = useMutation(ADD_MENU_HEADER)

  const { tenantId, menuId, setFormView, setSecondaryFormView } = useUI()

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      const { name, description } = values

      createMenuHeader({
        variables: { name: name, description: description, menuId: menuId },
        update: (store, { data }) => {
          try {
            const menuHeaderData = store.readQuery({
              query: MENU_HEADERS_BY_MENU,
              variables: { menuId: menuId },
            })

            store.writeQuery({
              query: MENU_HEADERS_BY_MENU,
              variables: { menuId: menuId },
              data: {
                menuHeadersByMenu: [...menuHeaderData.menuHeadersByMenu, data.createMenuHeader.menuHeader],
              },
            })
          } catch (error) {
            console.log(error)
          }
        },
      })

      setFormView('')
    },
  })

  const handleCancel = (event) => {
    event.preventDefault()
    setSecondaryFormView('')
  }

  const hasErrors = () => {
    if (!values.name) return true
    if (!values.description) return true
  }

  return (
    <Form onSubmit={handleSubmit} secondary>
      <h1>Create Header</h1>

      <Field
        id="name"
        name="name"
        required={true}
        type="text"
        label="Name"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        error={errors.name}
      />
      <Field
        id="description"
        type="text"
        name="description"
        label="Description"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description}
        error={errors.description}
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
