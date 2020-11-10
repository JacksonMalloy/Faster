const { createMenuItem, deleteMenuItem, updateMenuItem } = require('./resolvers')
const { MenuItemType } = require('../../typeDefs/menuitem')

const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')

const addMenuItem = {
  type: MenuItemType,
  description: 'Add a menu item',
  args: {
    menu_id: { type: GraphQLID },
    menu_header_id: { type: GraphQLID },
    base_price: { type: GraphQLString },
    description: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await createMenuItem(args, context),
}

const editMenuItem = {
  type: MenuItemType,
  description: 'Edit a menu item',
  args: {
    menu_item_id: { type: new GraphQLNonNull(GraphQLID) },
    menu_header_id: { type: GraphQLID },
    menu_id: { type: GraphQLID },
    base_price: { type: GraphQLString },
    description: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await updateMenuItem(args, context),
}

const removeMenuItem = {
  type: MenuItemType,
  description: 'Delete a menu item',
  args: {
    menu_item_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await deleteMenuItem(args, context),
}

module.exports = { addMenuItem, editMenuItem, removeMenuItem }
