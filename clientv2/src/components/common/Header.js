import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-around;

  h1 {
    margin: 0;

    font-size: 2rem;
    padding: 1rem;
  }

  span {
    width: 100%;
  }
`

export const Header = () => {
  return (
    <StyledHeader>
      <h1>FASTER</h1>
    </StyledHeader>
  )
}
