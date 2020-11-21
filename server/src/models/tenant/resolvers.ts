import TenantRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type RegisterTenantArgs = {
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

type UpdateTenantArgs = {
  name: string
  address: string
  tenant_id: number
  city: string
  country_region: string
  phone: string
  website_url: string
  postal_code: string
  sub_address: string
  province: string
}

export const TenantQueries = {
  tenant: async (parent: any, { tenant_id }: { tenant_id: number }, context: any, info: any) => {
    const tenantRepo = new TenantRepository()
    const data = await tenantRepo.getTenantById(tenant_id)
    return data
  },
  tenantByAccessCode: async (parent: any, { access_code }: { access_code: string }, context: any, info: any) => {
    const tenantRepo = new TenantRepository()
    const [data] = await tenantRepo.getTenantByAccessCode(access_code)
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
  removeTenant: async (parent: any, { tenant_id }: { tenant_id: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const tenantRepo = new TenantRepository()
    const data = await tenantRepo.deleteTenant(tenant_id)
    return data
  },
  editTenant: async (parent: any, args: UpdateTenantArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const tenantRepo = new TenantRepository()
    const data = await tenantRepo.updateTenant(args)
    return data
  },
}
