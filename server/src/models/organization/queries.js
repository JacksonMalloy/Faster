const { getAllOrganizations, getOrganizationById } = require('./resolvers')
const { OrganizationType } = require('../../typeDefs/organization')

const { GraphQLList, GraphQLID } = require('graphql')

const organization = {
  type: OrganizationType,
  description: 'Get an organization by ID',
  args: { organization_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getOrganizationById(args, context),
}

const organizations = {
  type: new GraphQLList(OrganizationType),
  description: 'Get all organizations',
  resolve: async (obj, args, context, info) => await getAllOrganizations(context),
}

module.exports = { organization, organizations }
