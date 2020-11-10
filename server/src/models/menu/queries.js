const { getMenuById, getAllMenusByOrganization } = require('./resolvers')
const { MenuType } = require('../../typeDefs/menu')

const { GraphQLList, GraphQLID } = require('graphql')

const menusByOrganization = {
  type: new GraphQLList(MenuType),
  description: 'Get menus by an organization',
  args: { organization_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getAllMenusByOrganization(args, context),
}

const menu = {
  type: MenuType,
  description: 'Get a menu by ID',
  args: { menu_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getMenuById(args, context),
}

module.exports = { menusByOrganization, menu }
