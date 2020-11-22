import ActiveUserRepository from './repo'

export const ActiveUserQueries = {
  activeUserAdmin: async (parent: any, args: any, context: { user: { admin_id: number } }, info: any) => {
    if (!context.user) {
      return null
    }

    const activeUserRepo = new ActiveUserRepository()
    const data = await activeUserRepo.getAdminById(context.user.admin_id)
    return data
  },
  activeUserCustomer: async (parent: any, args: any, context: { user: { customer_id: number } }, info: any) => {
    if (!context.user) {
      return null
    }

    const activeUserRepo = new ActiveUserRepository()
    const data = await activeUserRepo.getCustomerById(context.user.customer_id)
    return data
  },
}
