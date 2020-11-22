import React, { useState, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button } from 'components/common/Button'
import { useMutation } from '@apollo/client'
import { REMOVE_MENU } from 'graphql/mutations/menu/removeMenu'
import { MENUS_BY_ORGANIZATION } from 'graphql/queries/menu/menusByOrganization'
import UserContext from 'stores/UserContext'
import { menuDeleted } from 'stores/alertActions'

const StyledMenu = styled.div`
  min-height: 400px;
  max-height: 400px;
  display: flex;
  justify-content: stretch;
  align-items: space-between;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  position: relative;
  overflow: none;
  cursor: pointer;

  h1 {
    padding: 0rem !important;
  }

  img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
`

const StyledActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: right;
`

export const Menu = ({ menu, image }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [removeMenu, { data }] = useMutation(REMOVE_MENU)

  const [state, dispatch] = useContext(UserContext)

  console.log({ state })

  const handleEditLayout = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Link href="/dashboard/[slug]" as={`/dashboard/${menu.menu_id}`} key={menu.menu_id}>
        <StyledMenu>
          <h1>{menu.title}</h1>
        </StyledMenu>
      </Link>
    </>
  )
}
