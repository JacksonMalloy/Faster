const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
const { OrganizationType } = require('./organization')

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    customer_id: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    permissions: { type: GraphQLString },
    created_at: { type: GraphQLString },
    table_id: { type: GraphQLString },
    token: { type: GraphQLString },
    organizations: {
      type: new GraphQLList(OrganizationType),
    },
  },
})

module.exports = { CustomerType }
