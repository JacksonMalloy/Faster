import { useState, EventHandler } from 'react'
import { Tenant } from './Tenant'
import { Account } from './Account'

const Register = () => {
  const [formPhase, setFormPhase] = useState('tenant')
  const [authToken, setAuthToken] = useState(null)
  const [tenantId, setTenantId] = useState(null)

  const handlePhase: EventHandler<any> = (event) => {
    event.preventDefault()
    if (formPhase === 'tenant') setFormPhase('account')
    if (formPhase === 'account') setFormPhase('tenant')
  }

  return (
    <>
      {formPhase === 'tenant' ? (
        <>
          <h2>Registration</h2>
          <Tenant
            handlePhase={handlePhase}
            setFormPhase={setFormPhase}
            setAuthToken={setAuthToken}
            setTenantId={setTenantId}
          />
        </>
      ) : (
        <>
          <h2>Create Account</h2>
          <Account
            tenantId={tenantId}
            authToken={authToken}
            setAuthToken={setAuthToken}
            setFormPhase={setFormPhase}
          />
        </>
      )}
    </>
  )
}

export default Register
