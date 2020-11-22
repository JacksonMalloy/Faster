```
mutation {
  signupAdmin(phone: "2221112222", email: "test@fm.ca", name: "test", password: "123456") {
    code
    success
    message
    admin {
      organization_id
      email
      token
      created_at
      permissions
      name
      admin_id
      phone
    }
  }
}
```
