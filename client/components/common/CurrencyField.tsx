import React from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import styled from 'styled-components'
import { FocusEventHandler } from 'react'
import { EventHandler } from 'react'

const StyledCurrency = styled.div`
  padding: 1rem;
  position: relative;
  margin: 0.4rem;

  input {
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

const defaultMaskOptions = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

interface FieldProps {
  id: string
  maskOptions: any
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
  serverError?: any
}

export const CurrencyField = ({
  maskOptions,
  label,
  value = '',
  onChange,
  onBlur,
  error,
  name,
  id,
  type,
  ...inputProps
}: FieldProps) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })

  return (
    <StyledCurrency>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>

      <MaskedInput
        mask={currencyMask}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        {...inputProps}
      />
      {error && <StyledError>{error}</StyledError>}
    </StyledCurrency>
  )
}
