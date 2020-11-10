import React from 'react'
import styled from 'styled-components'

const StyledLayout = styled.div`
  max-width: 2000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`

export const GlobalLayout = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>
}
