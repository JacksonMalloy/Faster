import React from 'react'
import styled from 'styled-components'

const StyledModalLayout = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding-left: 300px;

  @media (max-width: 900px) {
    padding-left: 0px;
  }

  width: 100%;
  z-index: 2;
  height: inherit;
  display: flex;
  justify-content: flex-end;
  overflow-y: scroll;
  overflow-x: hidden;
`

const StyledContainer = styled.div`
  display: flex;
  position: fixed;
  left: 6rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: white;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 3;
`

const StyledFade = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: black;
  z-index: 2;
  opacity: 0.1;
`

export const ModalLayout = ({ children }) => {
  return (
    <StyledModalLayout>
      <StyledContainer>{children}</StyledContainer>
      <StyledFade />
    </StyledModalLayout>
  )
}
