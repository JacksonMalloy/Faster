import TenantRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type RegisterTenantArgs = {
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

type UpdateTenantArgs = {
  name: string
  address: string
  tenantId: number
  city: string
  countryRegion: string
  phone: string
  websiteUrl: string
  postalCode: string
  subAddress: string
  province: string
}

export const TenantQueries = {
  tenant: async (parent: any, { tenantId }: { tenantId: number }, context: any, info: any) => {
    const tenantRepo = new TenantRepository()
    const data = await tenantRepo.getTenantById(tenantId)
    return data
  },
  tenantByAccessCode: async (parent: any, { accessCode }: { accessCode: string }, context: any, info: any) => {
    const tenantRepo = new TenantRepository()
    const [data] = await tenantRepo.getTenantByAccessCode(accessCode)
    return data
  },
  tenants: async (parent: any, args: any, context: any, info: any) => {
    const tenantRepo = new TenantRepository()
    const data = await tenantRepo.getAllTenants()
    return data
  },
}

export const TenantMutations = {
  createTenant: async (parent: any, args: RegisterTenantArgs, context: any, info: any) => {
    const tenantRepo = new TenantRepository()
    const data = await tenantRepo.registerTenant(args)
    return data
  },
  deleteTenant: async (parent: any, { tenantId }: { tenantId: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const tenantRepo = new TenantRepository()
    const data = await tenantRepo.deleteTenant(tenantId)
    return data
  },
  updateTenant: async (parent: any, args: UpdateTenantArgs, context: any, info: any) => {
    // if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const tenantRepo = new TenantRepository()
    const data = await tenantRepo.updateTenant(args)
    return data
  },
}
