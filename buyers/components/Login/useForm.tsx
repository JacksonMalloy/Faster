import { useState, useEffect, useRef } from 'react'

const useForm = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues || {})
  const [errors, setErrors] = useState({})

  const normalizeInput = (value, previousValue) => {
    if (!value) return value
    const currentValue = value.replace(/[^\d]/g, '')
    const cvLength = currentValue.length

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`
    }
  }

  const handleChange = (event) => {
    const { target } = event
    const { name, value } = target

    if (name === 'tenant_phone' || name === 'account_phone') {
      const normalizedInput = normalizeInput(value, values.tenant_phone)
      setValues({ ...values, [name]: normalizedInput })
    } else {
      event.persist()
      setValues({ ...values, [name]: value })
    }
  }

  const validate = (name, value) => {
    switch (name) {
      case 'tenantName':
        if (value.split('').length === 0) {
          errors.tenantName = 'Your company must have a name'
        } else {
          errors.tenantName = ''
        }
        break
      case 'address':
        if (value.split('').length === 0) {
          errors.address = 'Your company must have an address'
        } else {
          errors.address = ''
        }
        break
      case 'countryRegion':
        if (value.split('').length === 0) {
          errors.countryRegion = 'This field is required'
        } else {
          errors.countryRegion = ''
        }
        break
      case 'postalCode':
        if (value.split('').length === 0) {
          errors.postalCode = 'This field is required'
        } else {
          errors.postalCode = ''
        }
        break
      case 'city':
        if (value.split('').length === 0) {
          errors.city = 'This field is required'
        } else {
          errors.city = ''
        }
        break
      case 'account_name':
        if (value.split('').length === 0) {
          errors.account_name = 'Your account must have a name'
        } else {
          errors.account_name = ''
        }
        break
      case 'account_phone':
        if (value.split('').length === 0) {
          errors.account_phone = 'Your account must have a valid phone number'
        } else if (value.split('').length > 0 && value.split('').length < 10) {
          errors.account_phone = 'Please enter a valid phone number'
        } else {
          errors.account_phone = ''
        }
        break
      case 'account_email':
        if (value.split('').length === 0) {
          errors.account_email = 'Your account must have an email'
        } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          errors.account_email = 'Please enter a valid email address'
        } else {
          errors.account_email = ''
        }
        break
      case 'password_check':
        if (values.password !== value) {
          errors.password_check = 'Passwords do not match!'
        } else {
          errors.password_check = ''
        }
        break

      default:
        break
    }
  }

  const handleBlur = (event) => {
    const { target } = event
    const { name, value } = target
    validate(name, value)
    setErrors({ ...errors })
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault()

    setErrors({ ...errors })
    onSubmit({ values, errors })
  }

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}

export default useForm
