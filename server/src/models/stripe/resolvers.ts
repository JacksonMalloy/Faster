import StripeRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

// const TenantQueries = {
//   tenant: async (parent, { tenantId }, context, info) => {
//     const stripeRepo = new StripeRepository()
//     const tenant = await tenantRepo.getTenantById(tenantId)
//     return tenant
//   },
//   tenants: async (parent, args, context, info) => {
//     const stripeRepo = new StripeRepository()
//     const tenants = await tenantRepo.getAllTenants()
//     return tenants
//   },
// }

type CreateStripeAccountArgs = {
  name: string
  address: string
  city: string
  countryRegion: string
  phone: string
  websiteUrl: string
  postalCode: string
  subAddress: string
  province: string
}

export const StripeMutations = {
  createStripeAccount: async (parent: any, args: CreateStripeAccountArgs, context: any, info: any) => {
    const stripeRepo = new StripeRepository()
    const data = await stripeRepo.createStripeAccount(args)
    return data
  },
  connectStripeAccount: async (parent: any, args: { accountId: number }, context: any, info: any) => {
    // if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const stripeRepo = new StripeRepository()
    const data = await stripeRepo.connectStripeAccount(args)
    return data
  },
}
