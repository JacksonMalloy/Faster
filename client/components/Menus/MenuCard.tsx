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

const StyledActions = styled.div`
  width: 100%;
  padding: 1rem;
  flex: 1;
  display: flex;

  button {
    cursor: pointer;
    padding: 0.4rem;
    border: 0.1rem solid #ffffff;
    border-radius: 500px;
    background-color: white;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 300;
    color: #010101;
    text-align: center;
    transition: all 0.2s;

    &:hover {
      color: #010101;
      background-color: #f6f6f6;
      border: 0.1rem solid #f6f6f6;
    }

    &:disabled {
      border: 0.1rem solid #f6f6f6;
      background-color: white;
      color: #cccccc;
    }
  }

  svg {
    fill: #010101;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }

  button {
    &:hover {
      svg {
        fill: #000000;
      }
    }
  }
`

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
      <div className="actions">
        <header>
          <h2>{title}</h2>
          {published ? <CheckCircleFill className="published" /> : <></>}
        </header>
        <StyledActions>
          <button onClick={handleEditMenu}>
            <span>
              <Tools />
            </span>
          </button>
          <button onClick={handleRouteChange}>
            <span>
              <Eye />
            </span>
          </button>
          <button onClick={publishMenu}>
            <span>
              <GitBranch />
            </span>
          </button>
          <button onClick={deleteMenu}>
            <span>
              <Trash />
            </span>
          </button>
        </StyledActions>
      </div>
      <aside>{image && image.image_url ? <img src={image.image_url} alt="" /> : <div className="placeholder" />}</aside>
    </Card>
  )
}
