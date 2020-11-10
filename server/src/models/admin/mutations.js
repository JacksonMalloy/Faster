const { registerAdmin, registerDirector, registerAdminToOrganization, loginAdmin, deleteAdmin } = require('./resolvers')
const { AdminType } = require('../../typeDefs/admin')

const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')

const signupAdmin = {
  type: AdminType,
  description: 'Register an administrator',
  args: {
    phone: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args, context, info) => await registerAdmin(args, context),
}

const signupDirector = {
  type: AdminType,
  description: 'Register a director',
  args: {
    phone: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args, context, info) => await registerDirector(args, context),
}

const signinAdmin = {
  type: AdminType,
  description: 'Login an administrator',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args, context, info) => await loginAdmin(args, context),
}

const joinAdminToOrganization = {
  type: AdminType,
  description: 'Connect an administrator to an organization by ID',
  args: {
    admin_id: { type: new GraphQLNonNull(GraphQLID) },
    organization_id: { type: new GraphQLNonNull(GraphQLID) },
    auth_token: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args, context, info) => await registerAdminToOrganization(args, context),
}

const removeAdmin = {
  type: AdminType,
  description: 'Delete an administrator',
  args: {
    admin_id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (obj, args, context, info) => await deleteAdmin(args, context),
}

module.exports = { signupAdmin, signupDirector, signinAdmin, joinAdminToOrganization, removeAdmin }
