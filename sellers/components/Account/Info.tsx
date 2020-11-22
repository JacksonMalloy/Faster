import { Button } from 'components/common/Button'
import Field from 'components/common/Field'
import { SelectProvinces } from 'components/Register/SelectProvinces'
import useForm from 'components/common/hooks/useForm'
import { useEffect } from 'react'
import { useTooltip } from 'components/UI/ToolTip'

export const Info = ({ data }) => {
  const { values, errors, handleChange, handleSubmit, initialize } = useForm({
    onSubmit: async ({ values }) => {
      console.log({ values })
    },
  })

  const ref = useTooltip('tooltip 1', {})

  // console.log({ data })

  useEffect(() => {
    initialize({
      access_code: data.access_code,
      address: data.address,
      auth_token: data.auth_token,
      city: data.city,
      country_region: data.country_region,
      name: data.name,
      phone: data.phone,
      postal_code: data.postal_code,
      province: data.province,
      sub_address: data.name,
      website_url: data.website_url,
    })
  }, [data, initialize])

  return (
    <>
      <h1 ref={ref}>General</h1>
      <Field
        id="name"
        name="name"
        required
        label="Name"
        value={values.name}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />
      <Field
        id="access_code"
        name="access_code"
        required
        label="Access Code"
        value={values.access_code}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />

      <Field
        id="phone"
        name="phone"
        required
        label="Phone"
        value={values.phone}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />
      <Field
        id="website_url"
        name="website_url"
        required
        label="Website URL"
        value={values.website_url}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />
      <div className="btns">
        <div />
        <Button value="Save" type="button">
          Save
        </Button>
      </div>

      <hr />
      <h1>Location</h1>

      <Field
        id="address"
        name="address"
        required
        label="Address"
        value={values.address}
        onChange={handleChange}
        type="text"
        // error={errors.address}
      />
      <Field
        id="city"
        name="city"
        required
        label="City"
        value={values.city}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />

      <Field
        id="country_region"
        name="country_region"
        required
        label="Country Region"
        value={values.country_region}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />

      <Field
        id="postal_code"
        name="postal_code"
        required
        label="Postal Code"
        value={values.postal_code}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />

      <Field
        id="sub_address"
        name="sub_address"
        required
        label="Sub Address"
        value={values.sub_address}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />
      {/* 
      <Field
        id="province"
        name="province"
        required
        label="Province"
        value={values.province}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      /> */}

      <SelectProvinces label="Province" />
      <div className="btns">
        <div />
        <Button value="Save" type="button">
          Save
        </Button>
      </div>

      <hr />

      <h1>Payment</h1>

      <Field
        id={'1'}
        name={'Test'}
        type={'type'}
        autoComplete={'true'}
        required={true}
        label={'Credit card number'}
        placeholder={'Test'}
      />

      <Field
        id={'1'}
        name={'Test'}
        type={'type'}
        autoComplete={'true'}
        required={true}
        label={'Billing address'}
        placeholder={'Test'}
      />

      {/* TODO - Pay option for customers */}

      <div className="btns">
        <div />
        <Button value="Save" type="button">
          Save
        </Button>
      </div>

      <hr />
      <h1>Security</h1>
      <Field
        id="auth_token"
        name="auth_token"
        required
        label="Admin Access Token"
        value={values.auth_token}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />

      {/* <Field
        id={'1'}
        name={'Test'}
        type={'type'}
        autoComplete={'true'}
        required={true}
        label={'Enable two-factor authentication'}
        placeholder={'Test'}
      />

      <Field
        id={'1'}
        name={'Test'}
        type={'type'}
        autoComplete={'true'}
        required={true}
        label={'Notify me of new logins'}
        placeholder={'Test'}
      /> */}

      <div className="btns">
        <div />
        <Button value="Save" type="button">
          Save
        </Button>
      </div>

      <hr />
    </>
  )
}
