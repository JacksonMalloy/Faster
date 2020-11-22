import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import UserContext from 'stores/UserContext'
import { readAlert, removeAlert } from 'stores/userActions'
import { useUI } from '../Context'

const StyledAlertModal = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000000;
`

const StyledAlert = styled.div`
  display: flex;
  flex-flow: row nowrap;
  place-content: center;
  position: relative;
  padding: 1rem;
  padding-right: 3rem;
  text-align: center;
  margin: 0.5rem;
  background-color: ${({ variant }) => variant};
  color: white;
`

const StyledMessage = styled.div`
  max-width: 24rem;
  font-weight: 900;
`

const StyledDismissButton = styled.div`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  top: 0;
  right: 0;
  padding: 0.1rem 0.5rem;

  &:hover {
    cursor: pointer;
  }
`

export const Alert = () => {
  const { openToast, closeToast } = useUI()

  const handleClick = () => {
    closeToast()
  }

  return (
    <StyledAlertModal>
      {openToast && (
        <StyledAlert key={alert.id} className={alert.type} variant={alert.variant}>
          <StyledMessage>{alert.message}</StyledMessage>
          <StyledDismissButton onClick={() => handleClick(alert)}>&times;</StyledDismissButton>
        </StyledAlert>
      )}
    </StyledAlertModal>
  )
}
