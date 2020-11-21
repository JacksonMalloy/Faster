import { useState, useRef, EventHandler, FormEventHandler, useCallback } from 'react'
import { normalizeInput } from '../../../utils/normalizeInput'
import { validate } from '../../../utils/validate'

interface useFormProps {
  initialValues?: {} | null
  onSubmit: FormEventHandler<HTMLFormElement>
}

const useForm = ({ initialValues, onSubmit }: useFormProps) => {
  const [values, setValues] = useState<any>(initialValues || {})
  const [errors, setErrors] = useState<any>({})

  const initial = useRef(initialValues)

  const initialize = useCallback((initialValues) => {
    if (!initialValues) {
      setValues(initial.current)
    } else {
      initial.current = initialValues
      setValues(initialValues)
    }
  }, [])

  const handleChange: EventHandler<any> = (event) => {
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

  const handleBlur: EventHandler<any> = (event) => {
    const { target } = event
    const { name, value } = target
    validate(name, value, values, errors)
    setErrors({ ...errors })
  }

  const handleSubmit: EventHandler<any> = (event) => {
    if (event) event.preventDefault()
    setErrors({ ...errors })
    onSubmit({ values, errors } as any)
  }

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    initialize,
  }
}

export default useForm
