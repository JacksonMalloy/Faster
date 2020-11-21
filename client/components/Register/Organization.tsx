import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import useForm from 'components/common/hooks/useForm'
import styled from 'styled-components'
import { CREATE_ORGANIZATION } from 'graphql/mutations/organization/createOrganization'
import { useMutation } from '@apollo/client'
import { SelectProvinces } from './SelectProvinces'
import { useState } from 'react'

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

type OrganizationProps = {
  setFormPhase: (s: string) => void
  setAuthToken: (s: string) => void
  setOrganizationId: (n: number) => void
}

export const Organization = ({ setFormPhase, setAuthToken, setOrganizationId }: OrganizationProps) => {
  const [createOrganization] = useMutation(CREATE_ORGANIZATION)
  const [province, setProvince] = useState('')

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: ({ errors, values }: any) => {
      const {
        address,
        city,
        organization_name,
        organization_phone,
        organization_website,
        postal_code,
        sub_address,
      } = values

      createOrganization({
        variables: {
          address: address,
          city: city,
          country_region: 'Canada',
          name: organization_name,
          phone: organization_phone,
          website_url: organization_website,
          postal_code: postal_code,
          sub_address: sub_address,
          province: province,
        },
        update: (store, { data }) => {
          const {
            createOrganization: {
              organization: { auth_token },
            },
          } = data
          setAuthToken(auth_token)

          const {
            createOrganization: {
              organization: { organization_id },
            },
          } = data
          setOrganizationId(organization_id)
        },
      })

      setFormPhase('account')
    },
  })

  const hasErrors = () => {
    if (!values.organization_name) return true
    if (!values.address) return true
    if (!values.city) return true
    if (!values.postal_code) return true
    if (!province) return true

    const postalCodeRegex = /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1}[ ]{0,1}\d{1}[A-Za-z]{1}\d{1}$/i
    if (!postalCodeRegex.test(values.postal_code.trim())) return true
  }

  // NEED TO ADD PROVINCE!
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Field
        id="organization_name"
        name="organization_name"
        type="text"
        placeholder=""
        label="Company Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.organization_name}
        error={errors.organization_name}
      />

      <Field
        id="address"
        name="address"
        type="text"
        placeholder=""
        label="Company Address"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address}
        error={errors.address}
      />

      <div className="group">
        <SelectProvinces
          id="province"
          name="province"
          type="text"
          placeholder=""
          label="Province"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.province}
          error={errors.province}
          province={province}
          setProvince={setProvince}
        />

        <Field
          id="city"
          name="city"
          type="text"
          placeholder=""
          label="City"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.city}
          error={errors.city}
        />
      </div>

      <div className="group">
        <Field
          id="sub_address"
          name="sub_address"
          type="text"
          placeholder=""
          label="Apt, suite, etc (optional)"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.sub_address}
          error={errors.sub_address}
        />

        <Field
          id="postal_code"
          name="postal_code"
          type="text"
          placeholder=""
          label="ZIP/Postal Code"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.postal_code}
          error={errors.postal_code}
        />
      </div>

      <Field
        id="organization_phone"
        name="organization_phone"
        type="tel"
        placeholder=""
        label="Company Phone (optional)"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.organization_phone}
        error={errors.organization_phone}
      />

      <Field
        id="organization_website"
        name="organization_website"
        type="url"
        placeholder=""
        label="Website URL (optional)"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.organization_website}
        error={errors.organization_website}
      />
      <div className="buttonContainer">
        <Button type={'submit'} disabled={hasErrors()} value="Register">
          Register
        </Button>
      </div>
    </StyledForm>
  )
}
