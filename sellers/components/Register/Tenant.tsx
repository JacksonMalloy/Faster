import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import useForm from 'components/common/hooks/useForm'
import styled from 'styled-components'
import { CREATE_TENANT } from 'graphql/mutations/tenant/createTenant'
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

type TenantProps = {
  setFormPhase: (s: string) => void
  setAuthToken: (s: string) => void
  setTenantId: (n: number) => void
}

export const Tenant = ({ setFormPhase, setAuthToken, setTenantId }: TenantProps) => {
  const [createTenant] = useMutation(CREATE_TENANT)
  const [province, setProvince] = useState('')

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: ({ errors, values }: any) => {
      const { address, city, tenantName, tenant_phone, tenant_website, postalCode, subAddress } = values

      createTenant({
        variables: {
          address: address,
          city: city,
          countryRegion: 'Canada',
          name: tenantName,
          phone: tenant_phone,
          websiteUrl: tenant_website,
          postalCode: postalCode,
          subAddress: subAddress,
          province: province,
        },
        update: (store, { data }) => {
          const {
            createTenant: {
              tenant: { authToken },
            },
          } = data
          setAuthToken(authToken)

          const {
            createTenant: {
              tenant: { tenantId },
            },
          } = data
          setTenantId(tenantId)
        },
      })

      setFormPhase('account')
    },
  })

  const hasErrors = () => {
    if (!values.tenantName) return true
    if (!values.address) return true
    if (!values.city) return true
    if (!values.postalCode) return true
    if (!province) return true

    const postalCodeRegex = /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1}[ ]{0,1}\d{1}[A-Za-z]{1}\d{1}$/i
    if (!postalCodeRegex.test(values.postalCode.trim())) return true
  }

  // NEED TO ADD PROVINCE!
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Field
        id="tenantName"
        name="tenantName"
        type="text"
        placeholder=""
        label="Company Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.tenantName}
        error={errors.tenant_name}
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
          id="subAddress"
          name="subAddress"
          type="text"
          placeholder=""
          label="Apt, suite, etc (optional)"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.subAddress}
          error={errors.subAddress}
        />

        <Field
          id="postalCode"
          name="postalCode"
          type="text"
          placeholder=""
          label="ZIP/Postal Code"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.postalCode}
          error={errors.postalCode}
        />
      </div>

      <Field
        id="tenant_phone"
        name="tenant_phone"
        type="tel"
        placeholder=""
        label="Company Phone (optional)"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.tenant_phone}
        error={errors.tenant_phone}
      />

      <Field
        id="tenant_website"
        name="tenant_website"
        type="url"
        placeholder=""
        label="Website URL (optional)"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.tenant_website}
        error={errors.tenant_website}
      />
      <div className="buttonContainer">
        <Button type={'submit'} disabled={hasErrors()} value="Register">
          Register
        </Button>
      </div>
    </StyledForm>
  )
}
