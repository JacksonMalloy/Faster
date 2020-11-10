const { createMenuHeader, deleteMenuHeader, updateMenuHeader } = require('./resolvers')
const { MenuHeaderType } = require('../../typeDefs/menuheader')

const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')

const addMenuHeader = {
  type: MenuHeaderType,
  description: 'Add a menu header',
  args: {
    menu_id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    sub_header: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await createMenuHeader(args, context),
}

const editMenuHeader = {
  type: MenuHeaderType,
  description: 'Edit a menu header',
  args: {
    menu_header_id: { type: new GraphQLNonNull(GraphQLID) },
    menu_id: { type: GraphQLID },
    name: { type: GraphQLString },
    sub_header: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await updateMenuHeader(args, context),
}

const removeMenuHeader = {
  type: MenuHeaderType,
  description: 'Delete a menu header',
  args: {
    menu_header_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await deleteMenuHeader(args, context),
}

module.exports = { addMenuHeader, editMenuHeader, removeMenuHeader }
