const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
const { AdminType } = require('./admin')

const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: {
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
    auth_token: { type: GraphQLString },
    admins: {
      type: new GraphQLList(AdminType),
    },
    directors: {
      type: new GraphQLList(AdminType),
    },
  },
})

module.exports = { OrganizationType }
