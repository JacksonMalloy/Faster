import AdminRepository from './repo'
import { isDirector } from '../../utils'

export const AdminQueries = {
  admin: async (parent: any, { adminId }: { adminId: number }, context: any, info: any) => {
    // if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const adminRepo = new AdminRepository()
    const data = await adminRepo.getAdminById(adminId)

    return data
  },
  adminsByTenant: async (
    parent: any,
    { tenantId }: { tenantId: number },
    context: { user: any },
    info: any
  ) => {
    if (!isDirector(context)) return null

    const adminRepo = new AdminRepository()
    const data = await adminRepo.getAdminsByTenant(tenantId)
    return data
  },
  // activeAdmin: () => {},
}

type AdminToOrgArgs = {
  adminId: number
  tenantId: number
  authToken: string
}

type AdminRegistrationArgs = {
  phone: string
  email: string
  name: string
  password: string
}

type LoginArgs = {
  email: string
  password: string
}

export const AdminMutations = {
  signupAdmin: async (parent: any, args: AdminRegistrationArgs, context: any, info: any) => {
    const adminRepo = new AdminRepository()
    const admin = await adminRepo.registerAdmin(args)
    return admin
  },
  signupDirector: async (parent: any, args: AdminRegistrationArgs, context: any, info: any) => {
    const adminRepo = new AdminRepository()
    const admin = await adminRepo.registerDirector(args)
    return admin
  },
  signinAdmin: async (parent: any, args: LoginArgs, context: any, info: any) => {
    const adminRepo = new AdminRepository()
    const admin = await adminRepo.loginAdmin(args)
    return admin
  },
  removeAdmin: async (parent: any, { adminId }: { adminId: number }, context: any, info: any) => {
    const adminRepo = new AdminRepository()
    const admin = await adminRepo.deleteAdmin(adminId)
    return admin
  },
  joinAdminToTenant: async (parent: any, args: AdminToOrgArgs, context: { user: any }, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }

    const adminRepo = new AdminRepository()
    const admin = await adminRepo.registerAdminToTenant(args)
    return admin
  },
  resetPassword: async (parent: any, args: { email: string }, context: any, info: any) => {
    const adminRepo = new AdminRepository()
    const admin = await adminRepo.resetPassword(args)
    return admin
  },
}
