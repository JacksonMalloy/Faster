import React from 'react'
import styled from 'styled-components'

const StyledField = styled.div`
  padding: 1rem;
  position: relative;
  margin: 0.4rem;
`

const StyledInput = styled.input`
  padding: 0 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.2s;
  outline: none;
  font-size: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  border: 2px solid;
  border-color: ${({ error }) => (error ? 'red' : '#black')};
  background-color: #fff;

  &:focus {
    border-color: ${({ error }) => (error ? 'red' : 'black')};
  }
`

const StyledLabel = styled.label`
  position: absolute;
  top: -0.1rem;
  left: 1.3rem;
  width: 80%;
  color: black;
  font-size: 0.8rem;
`

const StyledError = styled.span`
  position: absolute;
  bottom: 0rem;
  right: 1.3rem;
  width: 80%;
  color: red;
  font-size: 0.8rem;
  text-align: right;
`

export default function Field(props) {
  const {
    id,
    name,
    type = 'text',
    autoComplete,
    required,
    placeholder = 'Placeholder',
    label = 'First Name',
    value = '',
    onChange,
    onBlur,
    error,
  } = props

  return (
    <StyledField>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      />
      {error && <StyledError>{error}</StyledError>}
    </StyledField>
  )
}
