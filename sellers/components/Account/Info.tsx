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
      accessCode: data.accessCode,
      address: data.address,
      authToken: data.authToken,
      city: data.city,
      countryRegion: data.countryRegion,
      name: data.name,
      phone: data.phone,
      postalCode: data.postalCode,
      province: data.province,
      subAddress: data.name,
      websiteUrl: data.websiteUrl,
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
        id="accessCode"
        name="accessCode"
        required
        label="Access Code"
        value={values.accessCode}
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
        id="websiteUrl"
        name="websiteUrl"
        required
        label="Website URL"
        value={values.websiteUrl}
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
        id="countryRegion"
        name="countryRegion"
        required
        label="Country Region"
        value={values.countryRegion}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />

      <Field
        id="postalCode"
        name="postalCode"
        required
        label="Postal Code"
        value={values.postalCode}
        onChange={handleChange}
        type="text"
        // error={errors.name}
      />

      <Field
        id="subAddress"
        name="subAddress"
        required
        label="Sub Address"
        value={values.subAddress}
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
        id="authToken"
        name="authToken"
        required
        label="Admin Access Token"
        value={values.authToken}
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
