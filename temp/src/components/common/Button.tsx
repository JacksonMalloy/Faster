import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  cursor: pointer;
  padding: 0.35rem 1.2rem;
  border: 0.1rem solid #ffffff;
  border-radius: 0.12rem;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  background-color: ${({ background }) => (background ? background : 'black')};
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0.4rem;

  &:hover {
    color: #000000;
    background-color: #ffffff;
    border: 0.1rem solid #000000;
  }

  &:disabled {
    border: 0.1rem solid #f6f6f6;
    background-color: white;
    color: #cccccc;
  }
`

export const Button = ({ children, onClick, type, value, disabled, background }) => {
  return (
    <StyledButton onClick={onClick} type={type} value={value} disabled={disabled} background={background}>
      {children}
    </StyledButton>
  )
}
