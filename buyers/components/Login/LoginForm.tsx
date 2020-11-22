import { useState } from 'react'

import { LoginScaffold } from './LoginScaffold'
import { Recovery } from './Recovery'

export const LoginForm = () => {
  const [formPhase, setFormPhase] = useState('login')

  const handlePhase = (event) => {
    event.preventDefault()
    if (formPhase === 'login') setFormPhase('recovery')
    if (formPhase === 'recovery') setFormPhase('login')
  }

  return (
    <>
      {formPhase === 'login' ? (
        <>
          <h2>Login</h2>
          <LoginScaffold />
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
