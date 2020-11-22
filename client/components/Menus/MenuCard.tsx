import styled from 'styled-components'
import { useState } from 'react'

// GraphQL
import { useMutation } from '@apollo/client'
import { REMOVE_MENU } from 'graphql/mutations/menu/removeMenu'
import { EDIT_MENU } from 'graphql/mutations/menu/editMenu'

// SVGs
import Trash from 'assets/trash.svg'
import Tools from 'assets/tools.svg'
import Eye from 'assets/eye.svg'
import GitBranch from 'assets/git-branch.svg'
import CheckCircleFill from 'assets/check-circle-fill.svg'
import { useRouter } from 'next/router'
import { useUI } from '../Context'
import { handleDeleteMenu, handlePublishMenu } from '../Services/Menu'
import { Card } from '../UI'
import { Button } from '../common/Button'

type CardProps = {
  menu: {
    menu_id: any
    image?: any
    published?: boolean
    title?: string
    organization_id?: number
  }
  image: {
    image_id: number
    image_url: string
    menu_id?: number
    menu_item_id?: number
    organization_id: number
    uploaded_at: number
  }
  setIsRouting: (b: boolean) => void
}

export const MenuCard = ({ menu, image, setIsRouting }: CardProps) => {
  const { setSelectedMenuName, setSelectedMenu, setFormView, openToast, reset } = useUI()
  const [isOpen, setIsOpen] = useState(false)
  const [removeMenu] = useMutation(REMOVE_MENU)
  const [editMenu] = useMutation(EDIT_MENU)

  const router = useRouter()

  const { published, title, menu_id, organization_id } = menu

  const deleteMenu = async () => {
    const variables = { menu_id: menu_id }
    const args = { variables, organization_id }
    const data = await handleDeleteMenu(removeMenu, args).then(() => {
      openToast('Menu was successfully deleted', 'SUCCESS')
    })
  }

  const publishMenu = async () => {
    const variables = { menu_id: menu_id, published: !published }
    const args = { variables, organization_id }
    const data = await handlePublishMenu(editMenu, args).then(() => {
      openToast('Menu was successfully published', 'SUCCESS')
    })
  }

  const handleRouteChange = () => {
    setIsRouting(true)
    setSelectedMenu(menu)
    setSelectedMenuName(title)
    router.push(`/menu/${menu_id}`)
  }

  const handleEditMenu = () => {
    reset()
    setSelectedMenu(menu)
    setFormView('EDIT_MENU_VIEW')
  }

  return (
    <Card>
      <div>
        <header>
          <h2>{title}</h2>
          {published ? <CheckCircleFill className="published" /> : <></>}
        </header>
        <section>
          <Button onClick={handleEditMenu} value="edit">
            Edit
          </Button>
          <Button onClick={handleRouteChange} value="view">
            View
          </Button>
          <Button onClick={publishMenu} value="publish">
            Publish
          </Button>
          <Button onClick={deleteMenu} value="delete">
            Delete
          </Button>
        </section>
      </div>
      <aside>{image && image.image_url ? <img src={image.image_url} alt="" /> : <div className="placeholder" />}</aside>
    </Card>
  )
}
