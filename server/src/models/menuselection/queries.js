const {
  getMenuSelectionById,
  getMenuSelectionsByMenuItem,
  getMenuSelectionsByMenuChoice,
  getMenuSelectionsByOrganization,
} = require('./resolvers')
const { MenuSelectionType } = require('../../typeDefs/menuselection')

const { GraphQLList, GraphQLID } = require('graphql')

const menuSelection = {
  type: MenuSelectionType,
  description: 'Get a menu selection by ID',
  args: { menu_selection_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getMenuSelectionById(args, context),
}

const menuSelectionsByMenuChoice = {
  type: new GraphQLList(MenuSelectionType),
  description: 'Get the menu selections of a menu choice',
  args: { menu_choice_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getMenuSelectionsByMenuChoice(args, context),
}

const menuSelectionsByOrganization = {
  type: new GraphQLList(MenuSelectionType),
  description: 'Get the menu selections of an organization',
  args: { organization_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getMenuSelectionsByOrganization(args, context),
}

const menuSelectionsByMenuItem = {
  type: new GraphQLList(MenuSelectionType),
  description: 'Get the menu selections of a menu item',
  args: { menu_item_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getMenuSelectionsByMenuItem(args, context),
}

module.exports = { menuSelection, menuSelectionsByMenuItem, menuSelectionsByOrganization, menuSelectionsByMenuChoice }
