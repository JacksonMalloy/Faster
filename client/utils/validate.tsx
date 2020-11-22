export const validate = (name: string, value: string, values: any, errors: any) => {
  switch (name) {
    case 'organization_name':
      if (value.split('').length === 0) {
        errors.organization_name = 'Your company must have a name'
      } else {
        errors.organization_name = ''
      }
      break
    case 'address':
      if (value.split('').length === 0) {
        errors.address = 'Your company must have an address'
      } else {
        errors.address = ''
      }
      break
    case 'country_region':
      if (value.split('').length === 0) {
        errors.country_region = 'This field is required'
      } else {
        errors.country_region = ''
      }
      break
    case 'postal_code':
      if (value.split('').length < 6) {
        errors.postal_code = 'Please enter a valid postal code'
      } else {
        errors.postal_code = ''
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
      if (value.split('').length === 0 && value.split('').length !== 14) {
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
    case 'recovery_email':
      if (value.split('').length === 0 || !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        errors.recovery_email = 'Please enter a valid email address'
      } else {
        errors.recovery_email = ''
      }
      break
    case 'password_check':
      if (values.password !== value) {
        errors.password_check = 'Passwords do not match!'
      } else {
        errors.password_check = ''
      }
      break
    case 'title':
      if (value.split('').length === 0) {
        errors.title = 'Item must have a name'
      } else {
        errors.title = ''
      }
      break
    case 'menu_title':
      if (value.split('').length === 0) {
        errors.menu_title = 'Menu must have a name'
      } else {
        errors.menu_title = ''
      }
      break
    case 'description':
      if (value.split('').length === 0) {
        errors.description = 'Item must have a description'
      } else {
        errors.description = ''
      }
      break
    case 'name':
      if (value.split('').length === 0) {
        errors.name = 'Header must have a name'
      } else {
        errors.name = ''
      }
      break
    case 'sub_header':
      if (value.split('').length === 0) {
        errors.sub_header = 'Header must have a description'
      } else {
        errors.sub_header = ''
      }
      break
    case 'choice_header':
      if (value.split('').length === 0) {
        errors.choice_header = 'Choice must have a Name'
      } else {
        errors.choice_header = ''
      }
      break
    case 'choice_sub_header':
      if (value.split('').length === 0) {
        errors.choice_sub_header = 'Header must have a description'
      } else {
        errors.choice_sub_header = ''
      }
      break
    case 'price':
      if (value.split('').length === 0) {
        errors.price = 'Item must have a price'
      } else {
        errors.price = ''
      }
      break
    default:
      break
  }
}
