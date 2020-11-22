import React from 'react'
import styled from 'styled-components'

const StyledLayout = styled.main`
  padding: 4rem 0;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const MainLayout = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>
}
