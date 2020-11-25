import { Button } from 'components/common/Button'
import UploadFile from 'components/UploadFile'
import Field from 'components/common/Field'
import useForm from 'components/common/hooks/useForm'
import { useMutation } from '@apollo/client'
import { ADD_MENU } from 'graphql/mutations/menu/addMenu'
import { CONNECT_IMAGE_TO_MENU } from 'graphql/mutations/image/connectImageToMenu'
import { handleConnectImage, handleCreateMenu } from '../Services/Menu'
import Form from '../UI/Form'
import { useUI } from '../Context'

export const CreateMenu = () => {
  const { tenantId, formImage, openToast, reset } = useUI()

  const [addMenu, { data }] = useMutation(ADD_MENU)
  const [connectImageToMenu] = useMutation(CONNECT_IMAGE_TO_MENU)

  const { values, errors, handleChange, handleSubmit, handleBlur } = useForm({
    onSubmit: async ({ values }) => {
      const { menu_title } = values
      const variables = { tenantId: tenantId, title: menu_title }
      const args = { variables, tenantId }
      const { data } = await handleCreateMenu(addMenu, args)

      const handleImageUpload = async () => {
        const variables = {
          imageId: formImage.uploadImage.imageId,
          menuId: data.addMenu.menu.menuId,
        }

        const args = { variables, tenantId }
        const imageData = await handleConnectImage(connectImageToMenu, args)
        return imageData
      }

      if (data && data.addMenu && formImage) {
        const imageData = await handleImageUpload()
        console.log({ imageData })
      }

      values.menu_title = ''
    },
  })

  const hasErrors = () => {
    if (!values.menu_title) return true
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Menu</h1>

      <Field
        id="menu_title"
        name="menu_title"
        required
        label="Menu Title"
        placeholder="Ex. Drink Menu"
        value={values.menu_title}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        error={errors.menu_title}
      />
      <section className="form-img">
        <label>Menu Image (Optional)</label>
        <UploadFile />
      </section>
      <div className="form-btns">
        <div />
        <Button type="submit" value="Submit" disabled={hasErrors()}>
          Create
        </Button>
      </div>
    </Form>
  )
}
