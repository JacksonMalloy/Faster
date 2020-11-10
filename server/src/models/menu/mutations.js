const { createMenu, deleteMenu, updateMenu } = require('./resolvers')
const { MenuType } = require('../../typeDefs/menu')

const { GraphQLID, GraphQLString } = require('graphql')

const addMenu = {
  type: MenuType,
  description: 'Create a menu',
  args: {
    organization_id: { type: GraphQLID },
    title: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await createMenu(args, context),
}

const editMenu = {
  type: MenuType,
  description: 'Update the menu title',
  args: {
    menu_id: { type: GraphQLID },
    title: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await updateMenu(args, context),
}

const removeMenu = {
  type: MenuType,
  description: 'Delete a menu',
  args: {
    menu_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await deleteMenu(args, context),
}

module.exports = { addMenu, editMenu, removeMenu }
