import { useState } from 'react'
import { useMutation } from '@apollo/client'
import useForm from 'components/common/hooks/useForm'
import { useRouter } from 'next/router'
import { Login } from './Login'
import { Recovery } from './Recovery'
import { SIGNIN_ADMIN } from 'graphql/mutations/admin/signinAdmin'

const Auth = () => {
  const router = useRouter()

  const initialValues = {
    account_email: '',
    password: '',
  }

  const [signinAdmin] = useMutation(SIGNIN_ADMIN)
  const [serverError, setServerError] = useState({ message: '', error: false })

  const { values, errors, handleChange, handleSubmit, handleBlur } = useForm({
    initialValues,
    onSubmit: ({ values }: any) => {
      const { account_email, password } = values

      signinAdmin({
        variables: { email: account_email, password: password },
      })
        .then(({ data }) => {
          // If admin does not exist
          if (!data.signinAdmin.success) {
            setServerError({ message: 'Invalid credentials', error: true })

            setTimeout(() => {
              setServerError({ message: '', error: false })
            }, 3000)
          }

          const {
            signinAdmin: {
              admin: { token },
            },
          } = data

          if (token) {
            localStorage.setItem('auth_token', token)

            if (router.pathname === '/login') {
              router.push('/menus')
            } else {
              router.reload()
            }
          }
        })
        .catch((error) => {
          console.log({ error })
        })
    },
  })

  const [formPhase, setFormPhase] = useState<string>('login')

  const handlePhase = () => {
    if (formPhase === 'login') setFormPhase('recovery')
    if (formPhase === 'recovery') setFormPhase('login')
  }

  return (
    <>
      {formPhase === 'login' ? (
        <>
          <h2>Login</h2>
          <Login
            values={values}
            errors={errors}
            handleChange={handleChange}
            handlePhase={handlePhase}
            handleSubmit={handleSubmit}
            handleBlur={handleBlur}
            serverError={serverError}
          />
        </>
      ) : (
        <>
          <h2>Account Recovery</h2>
          <Recovery handlePhase={handlePhase} />
        </>
      )}
    </>
  )
}

export default Auth
