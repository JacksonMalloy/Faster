const { getMenuHeaderById, getAllMenuHeadersByMenu } = require('./resolvers')
const { MenuHeaderType } = require('../../typeDefs/menuheader')

const { GraphQLList, GraphQLID } = require('graphql')

const menuHeader = {
  type: MenuHeaderType,
  description: 'Get a menu header by ID',
  args: { menu_header_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getMenuHeaderById(args, context),
}

const menuHeadersByMenu = {
  type: new GraphQLList(MenuHeaderType),
  description: 'Get the menu headers in a menu',
  args: { menu_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getAllMenuHeadersByMenu(args, context),
}

module.exports = { menuHeader, menuHeadersByMenu }
