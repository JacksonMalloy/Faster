import React from 'react'
import styled from 'styled-components'

type Props = {
  background: string
  circle: boolean
}

const StyledButton = styled.button<Props>`
  cursor: pointer;
  padding: 0.35rem 1.2rem;
  border: 0.1rem solid #ffffff;
  border-radius: ${({ circle }) => (circle ? '50%' : '0.12rem')};
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  background-color: ${({ background }) => (background ? background : 'black')};
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

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

type ButtonProps = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler
  type?: any
  value: string
  disabled?: boolean
  background?: any
  circle?: any
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  value,
  disabled,
  background,
  circle,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      value={value}
      disabled={disabled}
      background={background}
      circle={circle}
    >
      {children}
    </StyledButton>
  )
}
