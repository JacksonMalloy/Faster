// TODO: Change fields to functions like fields: () => ({id: ..., name: ...})

const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const AdminType = new GraphQLObjectType({
  name: 'Admin',
  fields: {
    admin_id: { type: GraphQLString },
    organization_id: { type: GraphQLID },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    permissions: { type: GraphQLString },
    created_at: { type: GraphQLString },
    token: { type: GraphQLString },
  },
})

module.exports = { AdminType }
