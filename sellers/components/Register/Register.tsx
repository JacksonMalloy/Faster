import { useState, EventHandler } from 'react'
import { Organization } from './Organization'
import { Account } from './Account'

const Register = () => {
  const [formPhase, setFormPhase] = useState('organization')
  const [authToken, setAuthToken] = useState(null)
  const [organizationId, setOrganizationId] = useState(null)

  const handlePhase: EventHandler<any> = (event) => {
    event.preventDefault()
    if (formPhase === 'organization') setFormPhase('account')
    if (formPhase === 'account') setFormPhase('organization')
  }

  return (
    <>
      {formPhase === 'organization' ? (
        <>
          <h2>Registration</h2>
          <Organization
            handlePhase={handlePhase}
            setFormPhase={setFormPhase}
            setAuthToken={setAuthToken}
            setOrganizationId={setOrganizationId}
          />
        </>
      ) : (
        <>
          <h2>Create Account</h2>
          <Account
            organizationId={organizationId}
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
