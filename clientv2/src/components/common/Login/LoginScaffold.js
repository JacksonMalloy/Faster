import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../Button'
import Field from '../Field'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import useForm from './useForm'
import { SIGNUP_CUSTOMER } from '../../../graphql/mutations/customer/signupCustomer'
import { SIGNIN_CUSTOMER } from '../../../graphql/mutations/customer/signinCustomer'
import { SEND_SMS } from '../../../graphql/mutations/customer/sendMessage'
import history from '../../../history'
import { updateToken } from '../../../stores/userActions'
import UserContext from '../../../stores/UserContext'

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

export const LoginScaffold = () => {
  const [state, dispatch] = useContext(UserContext)
  const [signMethod, setSignMethod] = useState('phone')
  const [twoStepPINView, setTwoStepPINView] = useState('first')

  const handleTwoStepPIN = () => {
    if (twoStepPINView === 'first') {
      // Mutations
      // Send Text || Send Email
      if (signMethod === 'phone') {
        // Mutation to send text to phone
        console.log('SENDING TEXT MESSAGE')
      }

      if (signMethod === 'email') {
        // Mutation to send email to address
        console.log('SENDING EMAIL')
      }

      setTwoStepPINView('second')
    }
  }

  const handleSignInPhase = () => {
    if (signMethod === 'phone') {
      setSignMethod('email')
    } else {
      setSignMethod('phone')
    }
  }

  const initialValues = {
    account_phone: '',
    account_email: '',
    pin: '',
    recovery_phone: '',
    recovery_email: '',
    name: '',
  }

  const [signupCustomer] = useMutation(SIGNUP_CUSTOMER)
  const [signinCustomer] = useMutation(SIGNIN_CUSTOMER)
  const [sendMessage] = useMutation(SEND_SMS)

  // SIGN UP / REGISTRATION
  const {
    values: signupValues,
    errors: signupError,
    handleChange: handleSignupChange,
    handleSubmit: handleSignup,
  } = useForm({
    initialValues,
    onSubmit: ({ values }) => {
      console.log('SIGN UP')
      const { account_email, account_phone, name } = values

      console.log({ values })

      signupCustomer({
        variables: { email: account_email, phone: account_phone, name: name },
      }).then(({ data }) => {
        console.log({ data })

        const {
          signupCustomer: {
            customer: { customer_id, phone },
          },
        } = data

        sendMessage({ variables: { phone: phone, customer_id: customer_id } })

        handleTwoStepPIN()
      })
    },
  })

  // SIGN IN / LOGIN TOKEN ACCESS
  const {
    values: loginValues,
    errors: loginError,
    handleChange: handleLoginChange,
    handleSubmit: handleLogin,
  } = useForm({
    initialValues,
    onSubmit: ({ values }) => {
      console.info('SIGN IN')
      const { pin } = values
      const variables = { email: signupValues.account_email, phone: signupValues.account_phone, pin: pin }

      signinCustomer({
        variables: variables,
      }).then(({ data }) => {
        const {
          signinCustomer: {
            customer: { token },
          },
        } = data

        if (token) {
          dispatch(updateToken(token))
          window.location.reload()
        }
      })
    },
  })

  return (
    <StyledForm onSubmit={handleLogin}>
      {twoStepPINView === 'second' ? (
        <Field
          id='pin'
          name='pin'
          placeholder=''
          label='Pin'
          type='pin'
          onChange={handleLoginChange}
          value={loginValues.pin}
        />
      ) : (
        <>
          <Field
            id='name'
            name='name'
            placeholder=''
            label='Name'
            type='name'
            required
            onChange={handleSignupChange}
            value={signupValues.name}
          />
          {signMethod === 'phone' ? (
            <Field
              id='account_phone'
              name='account_phone'
              placeholder=''
              label='Phone'
              type='account_phone'
              onChange={handleSignupChange}
              value={signupValues.account_phone}
            />
          ) : (
            <Field
              id='account_email'
              name='account_email'
              placeholder=''
              label='Email'
              onChange={handleSignupChange}
              value={signupValues.account_email}
            />
          )}
        </>
      )}

      <div className='center'>
        {twoStepPINView === 'first' ? (
          <a onClick={handleSignInPhase} className='recovery'>
            <>{signMethod === 'phone' ? <>Try with Email</> : <>Try with Phone</>}</>
          </a>
        ) : (
          <a onClick={handleSignInPhase} className='recovery'>
            <>{signMethod === 'phone' ? <>Didn't get a text?</> : <>Didn't get an Email?</>}</>
          </a>
        )}

        {twoStepPINView === 'second' ? (
          <Button type='submit'>Submit</Button>
        ) : (
          <Button type='button' onClick={handleSignup}>
            Next
          </Button>
        )}
      </div>
    </StyledForm>
  )
}
