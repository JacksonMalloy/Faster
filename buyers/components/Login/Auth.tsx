import { useState } from 'react'

import Login from './Login'
import { Recovery } from './Recovery'

const Auth = () => {
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
          <Login />
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
