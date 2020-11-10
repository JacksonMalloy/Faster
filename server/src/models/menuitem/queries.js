const { getMenuItemById, getAllMenuItemsByOrganizationId, getAllMenuItemsByMenu } = require('./resolvers')
const { MenuItemType } = require('../../typeDefs/menuitem')
const { GraphQLList, GraphQLID } = require('graphql')

const menuItem = {
  type: MenuItemType,
  description: 'Get a menu item by ID',
  args: { menu_item_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getMenuItemById(args, context),
}

const menuItemsByOrganization = {
  type: new GraphQLList(MenuItemType),
  description: 'Get the menu items by organization',
  args: { organization_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getAllMenuItemsByOrganizationId(args, context),
}

const menuItemsByMenu = {
  type: new GraphQLList(MenuItemType),
  description: 'Get the menu items in a menu',
  args: { menu_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getAllMenuItemsByMenu(args, context),
}

module.exports = { menuItem, menuItemsByOrganization, menuItemsByMenu }
