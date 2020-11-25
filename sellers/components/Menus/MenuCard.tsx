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
import Image from 'next/image'

type CardProps = {
  menu: {
    menuId: any
    image?: any
    published?: boolean
    title?: string
    tenantId?: number
  }
  image: {
    imageId: number
    imageUrl: string
    menuId?: number
    itemId?: number
    tenantId: number
    uploadedAt: number
  }
  setIsRouting: (b: boolean) => void
}

export const MenuCard = ({ menu, image, setIsRouting }: CardProps) => {
  const { setSelectedMenuName, setSelectedMenu, setFormView, openToast, reset } = useUI()
  const [isOpen, setIsOpen] = useState(false)
  const [removeMenu] = useMutation(REMOVE_MENU)
  const [editMenu] = useMutation(EDIT_MENU)

  const router = useRouter()

  const { published, title, menuId, tenantId } = menu

  const deleteMenu = async () => {
    const variables = { menuId: menuId }
    const args = { variables, tenantId }
    const data = await handleDeleteMenu(removeMenu, args).then(() => {
      openToast('Menu was successfully deleted', 'SUCCESS')
    })
  }

  const publishMenu = async () => {
    const variables = { menuId: menuId, published: !published }
    const args = { variables, tenantId }
    const data = await handlePublishMenu(editMenu, args).then(() => {
      openToast('Menu was successfully published', 'SUCCESS')
    })
  }

  const handleRouteChange = () => {
    setIsRouting(true)
    setSelectedMenu(menu)
    setSelectedMenuName(title)
    router.push(`/menu/${menuId}`)
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
      <aside>
        {image && image.imageUrl ? (
          <Image src={image.imageUrl} alt="" width="150" height="150" />
        ) : (
          <div className="placeholder" />
        )}
      </aside>
    </Card>
  )
}
