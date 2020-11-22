import { useState, Dispatch, SetStateAction } from 'react'
import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import useForm from 'components/common/hooks/useForm'
import styled from 'styled-components'
import { JOIN_ADMIN_TO_ORGANIZATION } from 'graphql/mutations/admin/joinAdminToOrganization'
import { SIGNUP_DIRECTOR } from 'graphql/mutations/admin/signupDirector'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  justify-content: center;

  .group {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      width: 100%;
    }
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1rem;

    button {
      width: 100%;
    }
  }
`

type AccountProps = {
  handlePhase: any
  authToken: string | null
  organizationId: number | null
  setAuthToken: (s: Dispatch<SetStateAction<null>>) => void
}

export const Account = ({ authToken, organizationId, setAuthToken }: AccountProps) => {
  const [signupDirector] = useMutation(SIGNUP_DIRECTOR)
  const [joinAdminToOrganization] = useMutation(JOIN_ADMIN_TO_ORGANIZATION)

  const [emailServerError, setEmailServerError] = useState<any>({ message: '', error: false })
  const [phoneServerError, setPhoneServerError] = useState<any>({ message: '', error: false })

  const router = useRouter()

  const initialValues = {
    account_name: '',
    account_phone: '',
    account_email: '',
    password: '',
    password_check: '',
  }

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues,
    onSubmit: async ({ values }: any) => {
      const { account_phone, account_email, password, account_name } = values

      const signup = async () => {
        const data = await signupDirector({
          variables: {
            phone: account_phone,
            email: account_email,
            password: password,
            name: account_name,
          },
        })

        return data
      }

      const signupResult = await signup()

      const {
        data: {
          signupDirector: {
            admin: { admin_id, token },
            code,
            type,
            message,
            success,
          },
        },
      } = signupResult

      if (type === 'email') {
        setEmailServerError({ message: message, error: true })

        setTimeout(() => {
          setEmailServerError({ message: '', error: false })
        }, 3000)
      }

      if (type === 'phone') {
        setPhoneServerError({ message: message, error: true })

        setTimeout(() => {
          setPhoneServerError({ message: '', error: false })
        }, 3000)
      }

      const connect = async (authToken: string) => {
        const data = await joinAdminToOrganization({
          variables: {
            admin_id: admin_id,
            organization_id: organizationId,
            auth_token: authToken,
          },
        })

        return data
      }

      if (success && authToken) {
        // Set JWT before calling joinAdminToOrganization
        localStorage.setItem('auth_token', token)
        const connectResult = await connect(authToken)

        const {
          data: {
            joinAdminToOrganization: { success },
          },
        } = connectResult

        if (success) {
          console.log('successfully connected org to admin!')
          setAuthToken(null)
          router.push('/menus/')
        }
      }
    },
  })

  const hasErrors = () => {
    if (!values.account_name) {
      return true
    }

    if (!values.account_phone || values.account_phone.split('').length !== 14) {
      return true
    }

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!values.account_email) {
      return true
    }

    if (values.password !== values.password_check) {
      return true
    }

    if (!values.password || !values.password_check) {
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
        id="account_name"
        name="account_name"
        type="text"
        placeholder=""
        label="First Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.account_name}
        error={errors.account_name}
      />

      <Field
        id="account_phone"
        name="account_phone"
        type="tel"
        placeholder=""
        label="Phone"
        onChange={handleChange}
        value={values.account_phone}
        onBlur={handleBlur}
        error={errors.account_phone}
        serverError={phoneServerError}
      />

      <Field
        id="account_email"
        name="account_email"
        type="email"
        placeholder=""
        label="Email"
        onChange={handleChange}
        value={values.account_email}
        onBlur={handleBlur}
        error={errors.account_email}
        serverError={emailServerError}
      />

      <Field
        id="password"
        name="password"
        placeholder=""
        type="password"
        label="Password"
        onChange={handleChange}
        value={values.password}
        onBlur={handleBlur}
        error={errors.password}
      />

      <Field
        id="password_check"
        name="password_check"
        placeholder=""
        type="password"
        label="Confirm Password"
        onChange={handleChange}
        value={values.password_check}
        onBlur={handleBlur}
        error={errors.password_check}
      />

      <div className="buttonContainer">
        <Button type={'submit'} disabled={hasErrors()} value="Register">
          Register
        </Button>
      </div>
    </StyledForm>
  )
}
