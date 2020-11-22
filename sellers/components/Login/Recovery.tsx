import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import styled from 'styled-components'
import { EventHandler } from 'react'
import useForm from 'components/common/hooks/useForm'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { RESET_PASSWORD } from 'graphql/mutations/admin/resetPassword'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  width: 100%;

  .center {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem 1.5rem;
  }

  .spaced {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1.5rem;
  }

  .success {
    text-align: center;
  }
`

const StyledFormContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;

  .recovery {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.8rem;
    text-decoration: underline;
    cursor: pointer;
    border: none;
    background-color: white;
    padding: 0.5rem;
  }
`

type RecoveryComponentProps = {
  handlePhase: EventHandler<any>
}

export const Recovery = ({ handlePhase }: RecoveryComponentProps) => {
  const [resetPassword] = useMutation(RESET_PASSWORD)
  const [serverError, setServerError] = useState({ message: '', error: false })

  const [isEmailSent, setIsEmailSent] = useState(false)

  const initialValues = {
    recovery_email: '',
  }

  const { values, errors, handleChange, handleSubmit, handleBlur } = useForm({
    initialValues,
    onSubmit: ({ values }: any) => {
      const { recovery_email } = values

      resetPassword({
        variables: { email: recovery_email },
      })
        .then(({ data }) => {
          // If email does not exist
          if (!data.resetPassword.success) {
            setServerError({ message: 'Email not found', error: true })

            setTimeout(() => {
              setServerError({ message: '', error: false })
            }, 3000)
            console.log(`Bad Credentials`)
          } else {
            console.log('rendering email sent!')
            setIsEmailSent(true)
          }
        })
        .catch((error) => {
          console.log({ error })
        })
    },
  })

  const hasErrors = () => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!values.recovery_email) {
      return true
    }

    if (emailRegex.test(values.recovery_email.trim())) {
      return false
    } else {
      return true
    }
  }

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        {isEmailSent ? (
          <>
            <p className="success">We have sent a password reset link to {values.recovery_email}</p>
            <div className="spaced">
              <button onClick={handlePhase} className="recovery" type="button">
                Back to login
              </button>
            </div>
          </>
        ) : (
          <>
            <Field
              id="recovery_email"
              name="recovery_email"
              type="email"
              placeholder=""
              label="Email"
              onChange={handleChange}
              value={values.recovery_email}
              error={errors.recovery_email}
              onBlur={handleBlur}
              serverError={serverError}
            />
            <div className="spaced">
              <button onClick={handlePhase} className="recovery" type="button">
                Back to login
              </button>
              <Button type="submit" value="submit" disabled={hasErrors()}>
                Submit
              </Button>
            </div>
          </>
        )}
      </StyledForm>
    </StyledFormContainer>
  )
}
