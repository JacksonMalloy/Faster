import Field from '../common/Field'
import { Header } from '../common/Header'
import styled from 'styled-components'
import { Button } from '../common/Button'
import { useRouter } from 'next/router'
import useForm from '../common/hooks/useForm'

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

const Entry = () => {
  const router = useRouter()

  const { values, errors, handleChange, handleSubmit } = useForm({
    onSubmit: ({ values }) => {
      const { code } = values
      router.push(`/${code}`)
    },
  })

  return (
    <>
      <Header />
      <StyledForm onSubmit={handleSubmit}>
        <Field
          id="code"
          name="code"
          placeholder=""
          label="Access code"
          type="code"
          required
          onChange={handleChange}
          value={values.code}
        />
        <Button type="submit" value="submit">
          Search
        </Button>
      </StyledForm>
    </>
  )
}

export default Entry
