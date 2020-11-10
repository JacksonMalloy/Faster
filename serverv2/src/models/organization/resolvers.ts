import OrganizationRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type RegisterOrganizationArgs = {
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

type UpdateOrganizationArgs = {
  name: string
  address: string
  organization_id: number
  city: string
  country_region: string
  phone: string
  website_url: string
  postal_code: string
  sub_address: string
  province: string
}

export const OrganizationQueries = {
  organization: async (parent: any, { organization_id }: { organization_id: number }, context: any, info: any) => {
    const organizationRepo = new OrganizationRepository()
    const data = await organizationRepo.getOrganizationById(organization_id)
    return data
  },
  organizationByAccessCode: async (parent: any, { access_code }: { access_code: string }, context: any, info: any) => {
    const organizationRepo = new OrganizationRepository()
    const [data] = await organizationRepo.getOrganizationByAccessCode(access_code)
    return data
  },
  organizations: async (parent: any, args: any, context: any, info: any) => {
    const organizationRepo = new OrganizationRepository()
    const data = await organizationRepo.getAllOrganizations()
    return data
  },
}

export const OrganizationMutations = {
  createOrganization: async (parent: any, args: RegisterOrganizationArgs, context: any, info: any) => {
    const organizationRepo = new OrganizationRepository()
    const data = await organizationRepo.registerOrganization(args)
    return data
  },
  removeOrganization: async (
    parent: any,
    { organization_id }: { organization_id: number },
    context: any,
    info: any
  ) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const organizationRepo = new OrganizationRepository()
    const data = await organizationRepo.deleteOrganization(organization_id)
    return data
  },
  editOrganization: async (parent: any, args: UpdateOrganizationArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const organizationRepo = new OrganizationRepository()
    const data = await organizationRepo.updateOrganization(args)
    return data
  },
}
