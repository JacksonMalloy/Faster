import Link from 'next/link'
import styled from 'styled-components'

const StyledLayoutContainer = styled.section`
  position: relative;
  padding-left: 300px;
  height: 100%;
  width: 100%;
`

const StyledLinks = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;
  padding: 3rem;

  a {
    padding: 1rem;
  }
`

const StyledFormContainer = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: none;
  background-color: white;
`

// TODO active link highlights
const ActiveLink = ({ children, href }) => {
  return (
    <Link href={href} scroll={false}>
      <a>{children}</a>
    </Link>
  )
}

const MenuBuilderLayout = ({ children }) => {
  return (
    <>
      <StyledLayoutContainer>
        <StyledLinks>
          <ActiveLink href="/menu-builder/menu">Create Menu</ActiveLink>
          <ActiveLink href="/menu-builder/item">Create Item</ActiveLink>
          <ActiveLink href="/menu-builder/header">Create Header</ActiveLink>
          <ActiveLink href="/menu-builder/choice">Create Choice</ActiveLink>
          <ActiveLink href="/menu-builder/selection">Create Selection</ActiveLink>
        </StyledLinks>
        <StyledFormContainer>{children}</StyledFormContainer>
      </StyledLayoutContainer>
    </>
  )
}

export default MenuBuilderLayout
