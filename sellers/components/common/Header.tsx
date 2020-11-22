import styled from 'styled-components'
import Link from 'next/link'

const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  background-color: #ffffff;
  align-items: center;
  z-index: 9;

  .logo {
    font-weight: 900;
    font-size: 1.3rem;
    color: black;
    text-decoration: none;
    height: 100%;
    margin: 0;
    cursor: pointer;
  }

  .sm {
    font-size: 0.7rem;
    margin: 0;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`

export const Header = () => {
  return (
    <StyledHeader>
      <Link href="/">
        <div className="logo">FASTER</div>
      </Link>
      <div>
        <Link href="/register">
          <span className="sm">Create Account</span>
        </Link>
        <Link href="/login">
          <span className="sm">Sign in</span>
        </Link>
      </div>
    </StyledHeader>
  )
}
