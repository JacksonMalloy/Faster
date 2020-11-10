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
  const { organizationId, formImage, openToast, reset } = useUI()

  const [addMenu, { data }] = useMutation(ADD_MENU)
  const [connectImageToMenu] = useMutation(CONNECT_IMAGE_TO_MENU)

  const { values, errors, handleChange, handleSubmit } = useForm({
    onSubmit: async ({ values }) => {
      const { menu_title } = values
      const variables = { organization_id: organizationId, title: menu_title }
      const args = { variables, organizationId }
      const { data } = await handleCreateMenu(addMenu, args)

      const handleImageUpload = async () => {
        const variables = {
          image_id: formImage.uploadImage.image_id,
          menu_id: data.addMenu.menu.menu_id,
        }

        const args = { variables, organizationId }
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

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        id="menu_title"
        name="menu_title"
        required
        label="Menu Title"
        placeholder="Ex. Drink Menu"
        value={values.menu_title}
        onChange={handleChange}
        type="text"
        error={errors.menu_title}
      />
      <section className="form-img">
        <label>Menu Image (Optional)</label>
        <UploadFile />
      </section>
      <div className="form-btns">
        <div />
        <Button type="submit" value="Submit">
          Create
        </Button>
      </div>
    </Form>
  )
}
