const { registerOrganization, deleteOrganization, updateOrganization } = require('./resolvers')
const { OrganizationType } = require('../../typeDefs/organization')

const { GraphQLID, GraphQLString } = require('graphql')

const createOrganization = {
  type: OrganizationType,
  description: 'Create an organization',
  args: {
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    country_region: { type: GraphQLString },
    phone: { type: GraphQLString },
    website_url: { type: GraphQLString },
    postal_code: { type: GraphQLString },
    sub_address: { type: GraphQLString },
    province: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await registerOrganization(args, context),
}

const removeOrganization = {
  type: OrganizationType,
  description: 'Delete an organization',
  args: {
    organization_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await deleteOrganization(args, context),
}

// @@TODO - Needs work, just returns null -  Do we even need?
const editOrganization = {
  type: OrganizationType,
  description: 'Edit an organization',
  args: {
    organization_id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    country_region: { type: GraphQLString },
    phone: { type: GraphQLString },
    website_url: { type: GraphQLString },
    postal_code: { type: GraphQLString },
    sub_address: { type: GraphQLString },
    organization_id: { type: GraphQLString },
    province: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await updateOrganization(args, context),
}

module.exports = { createOrganization, removeOrganization, editOrganization }
