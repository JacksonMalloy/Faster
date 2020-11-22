import React from 'react'
import MainNavigation from 'components/MainNavigation'
import styled from 'styled-components'

const StyledContainer = styled.section`
  position: absolute;
  top: 0;
  padding-left: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: none;
  min-height: 100vh;
  background-color: white;
`

const Analytics = () => {
  return (
    <>
      <StyledContainer> Hello from Analytics</StyledContainer>
    </>
  )
}

export default Analytics
