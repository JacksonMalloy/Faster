import Link from 'next/link'
import MainNavigation from 'components/Navigation'

import styled from 'styled-components'

const StyledContainer = styled.section`
  padding-left: 300px;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }
`

// TODO active link highlights
const ActiveLink = ({ children, href }) => {
  return (
    <Link href={href} scroll={false}>
      <a style={{ padding: '1rem' }}>{children}</a>
    </Link>
  )
}

const AccountSettingsLayout = ({ children, permissions }) => {
  return (
    <>
      <MainNavigation permissions={permissions} />
      <StyledContainer>
        <h1>Account Settings</h1>

        <div style={{ boxShadow: 'inset 0 -2px 0 #edf2f7' }}>
          <ActiveLink href="/account/basic-information">Basic Information</ActiveLink>
          <ActiveLink href="/account/team-settings">Team Settings</ActiveLink>
          <ActiveLink href="/account/billing">Billing</ActiveLink>
          <ActiveLink href="/account/security">Security</ActiveLink>
        </div>

        <div>{children}</div>
      </StyledContainer>
    </>
  )
}

export default AccountSettingsLayout
