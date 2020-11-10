import styled from 'styled-components'

// GraphQL
import { useMutation } from '@apollo/client'
import { ADD_MENU_HEADER } from 'graphql/mutations/menu-header/addMenuHeader'
import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'

// Common Components
import { Button } from 'components/common/Button'
import Field from 'components/common/Field'
import useForm from 'components/common/hooks/useForm'
import { useUI } from 'components/Context'
import { Form } from 'components/UI'

export const CreateHeader = () => {
  const [addMenuHeader, { data }] = useMutation(ADD_MENU_HEADER)

  const { organizationId, menuId, setFormView } = useUI()

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      const { name, sub_header } = values

      addMenuHeader({
        variables: { name: name, sub_header: sub_header, menu_id: menuId },
        update: (store, { data }) => {
          try {
            const menuHeaderData = store.readQuery({
              query: MENU_HEADERS_BY_MENU,
              variables: { menu_id: menuId },
            })

            store.writeQuery({
              query: MENU_HEADERS_BY_MENU,
              variables: { menu_id: menuId },
              data: {
                menuHeadersByMenu: [...menuHeaderData.menuHeadersByMenu, data.addMenuHeader],
              },
            })
          } catch (error) {
            console.log(error)
          }
        },
      })

      setFormView('CREATE_ITEM_VIEW')
    },
  })

  const handleCancel = (event) => {
    event.preventDefault()
    setFormView('CREATE_ITEM_VIEW')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        id="name"
        name="name"
        required={true}
        type="text"
        label="Header"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        error={errors.name}
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
