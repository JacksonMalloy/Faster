import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import UploadFile from 'components/UploadFile'
import useForm from 'components/common/hooks/useForm'
import { useMutation } from '@apollo/client'
import { EDIT_MENU } from 'graphql/mutations/menu/editMenu'
import { CONNECT_IMAGE_TO_MENU } from 'graphql/mutations/image/connectImageToMenu'
import { handleConnectImage, handleEditMenu } from '../Services/Menu'
import { Form } from '../UI'
import { useUI } from '../Context'
import { useEffect } from 'react'

export const EditMenu = () => {
  const { organizationId, formImage, reset, openToast, selectedMenu, setFormView } = useUI()
  const [editMenu] = useMutation(EDIT_MENU)
  const [connectImageToMenu] = useMutation(CONNECT_IMAGE_TO_MENU)
  const initialValues = {
    menu_title: '',
  }

  const { values, errors, handleChange, handleSubmit, initialize, handleBlur } = useForm({
    initialValues,
    onSubmit: async ({ values }) => {
      const { menu_title } = values
      const variables = { menu_id: selectedMenu.menu_id, title: menu_title }
      const args = { variables, organizationId }
      const { data } = await handleEditMenu(editMenu, args)

      if (formImage) {
        const variables = {
          image_id: formImage.uploadImage.image_id,
          menu_id: data.editMenu.menu.menu_id,
        }

        const args = { variables, organizationId }

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
        <Button value="update">Update</Button>
      </div>
    </Form>
  )
}
