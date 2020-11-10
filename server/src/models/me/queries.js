const { getCurrentAdminById, getCurrentCustomerById } = require('./resolvers')
const { AdminType } = require('../../typeDefs/admin')
const { CustomerType } = require('../../typeDefs/customer')

// const {
//     GraphQLList,
//     GraphQLID
// } = require('graphql');

const activeAdmin = {
    type: AdminType,
    description: 'Get the active user',
    resolve: async (obj, args, context, info) => await getCurrentAdminById(context),
}

const activeCustomer = {
    type: CustomerType,
    description: 'Get the active customer',
    resolve: async (obj, args, context, info) => await getCurrentCustomerById(context),
}

module.exports = { activeAdmin, activeCustomer }
