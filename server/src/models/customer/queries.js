const { getCustomerById, getCustomersByOrganization } = require('./resolvers')
const { CustomerType } = require('../../typeDefs/customer')

const { GraphQLList, GraphQLID } = require('graphql')

const customer = {
  type: CustomerType,
  description: 'Get a customer by ID',
  args: { customer_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getCustomerById(args, context),
}

const customersByOrganization = {
  type: new GraphQLList(CustomerType),
  description: 'Get customers of an organization',
  args: { organization_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getCustomersByOrganization(args, context),
}

module.exports = { customer, customersByOrganization }
