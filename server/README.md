```
mutation {
  registerAdmin(phone: "2221112222", email: "test@fm.ca", name: "test", password: "123456") {
    code
    success
    message
    admin {
      tenantId
      email
      token
      createdAt
      permissions
      name
      adminId
      phone
    }
  }
}
```
