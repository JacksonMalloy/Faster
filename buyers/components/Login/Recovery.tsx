import Field from '../common/Field'
import { Button } from '../common/Button'
import styled from 'styled-components'

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
  }
`

export const Recovery = ({ values, handleChange, handlePhase }) => {
  const handlePhoneRecovery = (event) => {
    event.preventDefault()
    console.log('phone recovery')
  }

  const handleEmailRecovery = (event) => {
    event.preventDefault()
    console.log('email recovery')
  }

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleEmailRecovery}>
        <Field
          id="recovery_email"
          name="recovery_email"
          placeholder=""
          label="Email"
          onChange={handleChange}
          value={values.recovery_email}
        />
        <div className="center">
          <Button type="submit">Submit</Button>
        </div>
      </StyledForm>

      <StyledForm onSubmit={handlePhoneRecovery}>
        <Field
          id="recovery_email"
          name="recovery_email"
          placeholder=""
          label="Phone"
          onChange={handleChange}
          value={values.recovery_email}
        />
        <div className="spaced">
          <a onClick={handlePhase} className="recovery">
            Back to login
          </a>
          <Button type="submit">Submit</Button>
        </div>
      </StyledForm>
    </StyledFormContainer>
  )
}
