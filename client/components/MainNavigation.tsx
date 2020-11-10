import Link from 'next/link'
import styled from 'styled-components'
import { resetCaches } from '@apollo/client'
import { useRouter } from 'next/router'

// SVGS
import Archive from 'assets/archive.svg'
import BellFill from 'assets/bell-fill.svg'
import CreditCard from 'assets/credit-card.svg'
import Eye from 'assets/eye.svg'
import EyeSlash from 'assets/eye-slash.svg'
import FileMedia from 'assets/file-media.svg'
import GitBranch from 'assets/git-branch.svg'
import Graph from 'assets/graph.svg'
import Home from 'assets/home.svg'
import Key from 'assets/key.svg'
import Location from 'assets/location.svg'
import Organization from 'assets/organization.svg'
import People from 'assets/people.svg'
import Person from 'assets/person.svg'
import Plus from 'assets/plus.svg'
import Rocket from 'assets/rocket.svg'
import Search from 'assets/search.svg'
import Server from 'assets/server.svg'
import Settings from 'assets/settings.svg'
import ShieldCheck from 'assets/shield-check.svg'
import Telescope from 'assets/telescope.svg'
import Tools from 'assets/tools.svg'
import Trash from 'assets/trash.svg'
import Versions from 'assets/versions.svg'
import X from 'assets/x.svg'
import Zap from 'assets/zap.svg'
import { ReactChild, ReactChildren } from 'react'
import { Button } from './common/Button'

// Column Navigation Admin Panel
const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #f5f5f5;
  position: absolute;
  min-height: 100vh;
  overflow: none;
  top: 0;
  left: 0;
  padding: 1rem;
  z-index: 9;
  position: fixed;

  @media (max-width: 900px) {
    width: 100px;
  }

  header {
    width: 100%;
    background-color: white;
    margin: 0 0 1rem 0;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 900px) {
      display: none;
    }

    .profile {
      padding: 0.5rem;
      text-align: center;
    }

    .logo {
      font-size: 2rem;
      color: black;
      text-decoration: none;
      height: 100%;
      margin: 0;
      padding: 1rem;
      width: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
    }
  }
`

type Props = {
  active: boolean
}

const StyledNavElement = styled.a<Props>`
  width: 100%;
  background-color: ${({ active }) => (active ? `black` : `white`)};
  margin: 0.2rem 0;
  border-radius: 0.5rem;
  text-decoration: none;
  color: black;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1rem;

  @media (max-width: 900px) {
    padding-left: 0;
    justify-content: center;
    align-content: center;
  }

  p {
    margin: 0;
    padding: 0.5rem;
    color: ${({ active }) => (active ? `white` : `black`)};

    @media (max-width: 900px) {
      display: none;
    }
  }

  svg {
    margin: 0.5rem;
    fill: ${({ active }) => (active ? `white` : `black`)};
  }
`

type ActiveLinkProps = {
  children: ReactChild
  href: string
}

function ActiveLink({ children, href }: ActiveLinkProps) {
  const router = useRouter()

  const handleClick: React.EventHandler<any> = (event) => {
    event.preventDefault()
    router.push(href)
  }

  return (
    <StyledNavElement href={href} onClick={handleClick} active={router.pathname === href}>
      {children}
    </StyledNavElement>
  )
}

type MainNavigationProps = {
  children: ReactChild
  permissions?: string
}

const MainNavigation = ({ children, permissions }: MainNavigationProps) => {
  const router = useRouter()

  const handleSignout = () => {
    // clear token
    localStorage.setItem('auth_token', '')
    resetCaches()
    router.push('/')
  }

  return (
    <>
      <StyledNav>
        <header>
          <h1 className="logo">FASTER</h1>
        </header>
        {/* 
        <ActiveLink href="/dashboard">
          <>
            <Versions />
            <p className="hide">Dashboard</p>
          </>
        </ActiveLink> */}

        <ActiveLink href="/menus">
          <>
            <Rocket />
            <p className="hide">Menus</p>
          </>
        </ActiveLink>

        <ActiveLink href="/orders">
          <>
            <CreditCard />
            <p className="hide">Orders</p>
          </>
        </ActiveLink>

        {/* <ActiveLink href="/analytics">
          <>
            <Graph />
            <p className="hide">Analytics</p>
          </>
        </ActiveLink> */}

        <ActiveLink href="/staff">
          <>
            <Person />
            <p className="hide">Staff</p>
          </>
        </ActiveLink>

        <ActiveLink href="/account/basic-information">
          <>
            <Settings />
            <p className="hide">Settings</p>
          </>
        </ActiveLink>

        {/* {permissions === 'DIRECTOR' && ( */}
        {/* <ActiveLink href="/gallery">
          <>
            <FileMedia />
            <p className="hide">Gallery</p>
          </>
        </ActiveLink> */}
        <Button value="button" onClick={handleSignout}>
          Logout
        </Button>
      </StyledNav>
      {children}
    </>
  )
}

export default MainNavigation
