import ActiveUserRepository from './repo'

export const ActiveUserQueries = {
  activeUserAdmin: async (parent: any, args: any, context: { user: { adminId: number } }, info: any) => {
    if (!context.user) {
      return null
    }

    const activeUserRepo = new ActiveUserRepository()
    const data = await activeUserRepo.getAdminById(context.user.adminId)
    return data
  },
  activeUserCustomer: async (parent: any, args: any, context: { user: { customerId: number } }, info: any) => {
    if (!context.user) {
      return null
    }

    const activeUserRepo = new ActiveUserRepository()
    const data = await activeUserRepo.getCustomerById(context.user.customerId)
    return data
  },
}
