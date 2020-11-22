import React, { useEffect } from 'react'
import Field from '../common/Field'
import { Header } from '../common/Header'
import useForm from '../common/Login/useForm'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../common/Button'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  width: 100%;

  .center {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1.5rem;
  }

  .recovery {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.8rem;
    text-decoration: underline;
  }
`

const Entry = () => {
  const history = useHistory()

  const { values, errors, handleChange, handleSubmit } = useForm({
    onSubmit: ({ values }) => {
      const { code } = values
      history.push(`/${code}`)
    },
  })

  return (
    <>
      <Header />
      <StyledForm onSubmit={handleSubmit}>
        <Field
          id='code'
          name='code'
          placeholder=''
          label='Access code'
          type='code'
          required
          onChange={handleChange}
          value={values.code}
        />
        <Button type='submit'>Submit</Button>
      </StyledForm>
    </>
  )
}

export default Entry
