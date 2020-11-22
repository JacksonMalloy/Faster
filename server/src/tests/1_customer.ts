import CustomerRepository from '../models/customer/repo'
import pool from '../db/config'
import faker from 'faker'

const customerRepo = new CustomerRepository()

export const registerCustomers = () =>
  describe('Register Customers', () => {
    it(`Register Customers`, async () => {
      for (let i = 0; i < 10; i++) {
        const variables = {
          phone: faker.phone.phoneNumberFormat(),
          email: faker.internet.email(),
          name: faker.name.findName(),
          password: '123456',
        }
        const result = await customerRepo.registerCustomer(variables)

        expect(result.customer.permissions).toEqual('CUSTOMER')
        expect(result.customer.password).not.toEqual(variables.password)
      }
    })
  })
