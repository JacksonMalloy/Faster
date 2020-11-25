import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import UploadFile from 'components/UploadFile'
import useForm from 'components/common/hooks/useForm'
import { useMutation } from '@apollo/client'
import { EDIT_MENU } from 'graphql/mutations/menu/updateMenu'
import { CONNECT_IMAGE_TO_MENU } from 'graphql/mutations/image/connectImageToMenu'
import { handleConnectImage, handleEditMenu } from '../Services/Menu'
import { Form } from '../UI'
import { useUI } from '../Context'
import { useEffect } from 'react'

export const EditMenu = () => {
  const { tenantId, formImage, reset, openToast, selectedMenu, setFormView } = useUI()
  const [updateMenu] = useMutation(EDIT_MENU)
  const [connectImageToMenu] = useMutation(CONNECT_IMAGE_TO_MENU)
  const initialValues = {
    menu_title: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const { menu_title } = values
      const variables = { menuId: selectedMenu.menuId, title: menu_title }
      const args = { variables, tenantId }
      const { data } = await handleEditMenu(updateMenu, args)

      if (formImage) {
        const variables = {
          imageId: formImage.uploadImage.imageId,
          menuId: data.updateMenu.menu.menuId,
        }

        const args = { variables, tenantId }

        await handleConnectImage(connectImageToMenu, args).then(() => {
          reset()
          openToast('Connected Image Successfully', 'SUCCESS')
        })
      }

      setFormView('CREATE_MENU_VIEW')
      reset()
    },
  })

  useEffect(() => {
    initialize({ menu_title: selectedMenu?.title })
  }, [initialize, selectedMenu])

  const handleCancel = () => {
    setFormView('CREATE_MENU_VIEW')
    reset()
  }

  const hasErrors = () => {
    if (!values.menu_title) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Edit Menu</h1>

      <Field
        id="menu_title"
        name="menu_title"
        required
        label="Menu Title"
        placeholder="Ex. Drink Menu"
        value={values.menu_title}
        onChange={handleChange}
        error={errors.menu_title}
        type="text"
      />
      <section className="form-img">
        <label>Menu Image (Optional)</label>
        <UploadFile image={selectedMenu?.image} />
      </section>
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
