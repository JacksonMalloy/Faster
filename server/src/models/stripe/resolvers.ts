import StripeRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

// const TenantQueries = {
//   tenant: async (parent, { tenant_id }, context, info) => {
//     const stripeRepo = new StripeRepository()
//     const tenant = await tenantRepo.getTenantById(tenant_id)
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
  country_region: string
  phone: string
  website_url: string
  postal_code: string
  sub_address: string
  province: string
}

export const StripeMutations = {
  createStripeAccount: async (parent: any, args: CreateStripeAccountArgs, context: any, info: any) => {
    const stripeRepo = new StripeRepository()
    const data = await stripeRepo.createStripeAccount(args)
    return data
  },
  connectStripeAccount: async (parent: any, args: { account_id: number }, context: any, info: any) => {
    // if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const stripeRepo = new StripeRepository()
    const data = await stripeRepo.connectStripeAccount(args)
    return data
  },
}
