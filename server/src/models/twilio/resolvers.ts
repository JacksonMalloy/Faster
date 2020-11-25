import TwilioRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

// const TenantQueries = {
//   tenant: async (parent, { tenantId }, context, info) => {
//     const twilioRepo = new TwilioRepository()
//     const tenant = await tenantRepo.getTenantById(tenantId)
//     return tenant
//   },
//   tenants: async (parent, args, context, info) => {
//     const twilioRepo = new TwilioRepository()
//     const tenants = await tenantRepo.getAllTenants()
//     return tenants
//   },
// }

type CreateMessageArgs = {
  phone: string
  customerId: number
}

export const TwilioMutations = {
  sendMessage: async (parent: any, args: CreateMessageArgs, context: any, info: any) => {
    const twilioRepo = new TwilioRepository()
    const data = await twilioRepo.createMessage(args)
    return data
  },
  //   connectStripeAccount: async (parent, args, context, info) => {
  //     // if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
  //     const twilioRepo = new TwilioRepository()
  //     const data = await twilioRepo.connectStripeAccount(args)
  //     return data
  //   },
}
