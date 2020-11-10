const { registerCustomer, connectCustomerToOrganization, loginCustomer, deleteCustomer } = require('./resolvers')
const { CustomerType } = require('../../typeDefs/customer')

const { GraphQLID, GraphQLString } = require('graphql')

const signupCustomer = {
  type: CustomerType,
  description: 'Register a customer',
  args: {
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await registerCustomer(args, context),
}

const signinCustomer = {
  type: CustomerType,
  description: 'Login a customer',
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await loginCustomer(args, context),
}

const joinCustomerToOrganization = {
  type: CustomerType,
  description: 'Connect a customer to an organization',
  args: {
    customer_id: { type: GraphQLID },
    organization_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await connectCustomerToOrganization(args, context),
}

const removeCustomer = {
  type: CustomerType,
  description: 'Delete a customer',
  args: {
    customer_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await deleteCustomer(args, context),
}

module.exports = { signupCustomer, signinCustomer, joinCustomerToOrganization, removeCustomer }
