import { EventHandler } from 'react'
import { FocusEventHandler } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

type Props = {
  error: string
}

const StyledSelectContainer = styled.div<Props>`
  padding: 1rem;
  position: relative;

  select {
    cursor: pointer;
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
    border-color: ${({ error }) => (error ? 'red' : 'black')};
    background-color: #fff;

    &:focus {
      border-color: ${({ error }) => (error ? 'red' : 'black')};
    }
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

interface FieldProps {
  id: string
  name: string
  type: string
  autoComplete?: string
  required?: boolean
  placeholder?: string
  label?: string
  value: string
  onChange: EventHandler<any>
  onBlur?: FocusEventHandler
  error: string
  province: string
  setProvince: (s: string) => void
}

export const SelectProvinces = (props: FieldProps) => {
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
    province,
    setProvince,
  } = props

  return (
    <StyledSelectContainer error={error}>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <select value={province} onChange={(event) => setProvince(event.target.value)}>
        <option value=""></option>
        <option value="ab">Alberta</option>
        <option value="bc">British Columbia</option>
        <option value="ma">Manitoba</option>
        <option value="nb">New Brunswick</option>
        <option value="nl">Newfoundland & Labrador</option>
        <option value="ns">Nova Scotia</option>
        <option value="on">Ontario</option>
        <option value="pe">Prince Edward Island</option>
        <option value="qc">Quebec</option>
        <option value="sk">Saskatchewan</option>
        <option value="nw">Northwest Territories</option>
        <option value="nu">Nunavut</option>
        <option value="yk">Yukon</option>
      </select>
      {error && <StyledError>{error}</StyledError>}
    </StyledSelectContainer>
  )
}
