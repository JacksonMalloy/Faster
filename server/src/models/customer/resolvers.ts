import CustomerRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type RegistrationArgs = {
  phone: string
  email: string
  name: string
}

type LoginArgs = {
  email: string
  pin: string
  phone: string
}

type ConnectCustomerWithOrgArgs = {
  customer_id: number
  tenant_id: number
}

export const CustomerQueries = {
  customer: async (parent: any, { customer_id }: { customer_id: number }, context: any, info: any) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.getCustomerById(customer_id)
    return data
  },
  customersByTenant: async (
    parent: any,
    { tenant_id }: { tenant_id: number },
    context: any,
    info: any
  ) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.getCustomersByTenant(tenant_id)
    return data
  },
}

export const CustomerMutations = {
  signupCustomer: async (parent: any, args: RegistrationArgs, context: any, info: any) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.registerCustomer(args)
    return data
  },
  signinCustomer: async (parent: any, args: LoginArgs, context: any, info: any) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.loginCustomer(args)
    return data
  },
  removeCustomer: async (parent: any, { customer_id }: { customer_id: number }, context: any, info: any) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.deleteCustomer(customer_id)
    return data
  },
  joinCustomerToTenant: async (parent: any, args: ConnectCustomerWithOrgArgs, context: any, info: any) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.connectCustomerToTenant(args)
    return data
  },
}
