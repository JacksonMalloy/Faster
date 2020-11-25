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
  customerId: number
  tenantId: number
}

export const CustomerQueries = {
  customer: async (parent: any, { customerId }: { customerId: number }, context: any, info: any) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.getCustomerById(customerId)
    return data
  },
  customersByTenant: async (
    parent: any,
    { tenantId }: { tenantId: number },
    context: any,
    info: any
  ) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.getCustomersByTenant(tenantId)
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
  removeCustomer: async (parent: any, { customerId }: { customerId: number }, context: any, info: any) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.deleteCustomer(customerId)
    return data
  },
  joinCustomerToTenant: async (parent: any, args: ConnectCustomerWithOrgArgs, context: any, info: any) => {
    const customerRepository = new CustomerRepository()
    const data = await customerRepository.connectCustomerToTenant(args)
    return data
  },
}
