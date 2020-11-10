const { getAdminById, getAdminsByOrganization } = require('./resolvers')
const { AdminType } = require('../../typeDefs/admin')

const { GraphQLList, GraphQLID } = require('graphql')

const admin = {
  type: AdminType,
  description: 'Get an administrator by ID',
  args: { admin_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getAdminById(args, context),
}

const adminsByOrganization = {
  type: new GraphQLList(AdminType),
  description: 'Get administrators within an organization',
  args: { organization_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getAdminsByOrganization(args, context),
}

module.exports = { admin, adminsByOrganization }
