import { Button } from 'components/common/Button'
import Field from 'components/common/Field'
import { EventHandler } from 'react'
import styled from 'styled-components'

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
    cursor: pointer;
    border: none;
    background-color: white;
    padding: 0.5rem;
  }
`

type ErrorValueProps = {
  account_email: string
  password: string
}

type LoginProps = {
  values: ErrorValueProps
  errors: ErrorValueProps
  serverError: any
  handleChange: EventHandler<any>
  handlePhase: EventHandler<any>
  handleSubmit: EventHandler<any>
  handleBlur: EventHandler<any>
}

export const Login = ({
  values,
  errors,
  serverError,
  handleChange,
  handlePhase,
  handleSubmit,
  handleBlur,
}: LoginProps) => {
  const hasErrors = () => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!values.account_email) {
      return true
    }

    if (emailRegex.test(values.account_email.trim())) {
      return false
    } else {
      return true
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Field
        id="account_email"
        name="account_email"
        placeholder=""
        label="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.account_email}
        type="email"
        error={errors.account_email}
        serverError={serverError}
        required
      />
      <Field
        id="password"
        name="password"
        placeholder=""
        label="Password"
        type="password"
        onChange={handleChange}
        value={values.password}
        error={errors.password}
        serverError={serverError}
      />
      <div className="center">
        <button onClick={handlePhase} className="recovery" type="button">
          Forgot password?
        </button>
        <Button type="submit" value="submit" disabled={hasErrors()}>
          Submit
        </Button>
      </div>
    </StyledForm>
  )
}
