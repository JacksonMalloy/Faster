const {
  createMenuChoice,
  deleteMenuChoice,
  updateMenuChoice,
  connectingMenuChoiceToMenuItem,
  removingMenuChoicesMenuItemsConnection,
} = require('./resolvers')
const { MenuChoiceType } = require('../../typeDefs/menuchoice')

const { GraphQLID, GraphQLString, GraphQLList } = require('graphql')

const addMenuChoice = {
  type: MenuChoiceType,
  description: 'Add a menu choice',
  args: {
    organization_id: { type: GraphQLID },
    header: { type: GraphQLString },
    sub_header: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await createMenuChoice(args, context),
}

const editMenuChoice = {
  type: MenuChoiceType,
  description: 'Edit a menu choice',
  args: {
    menu_choice_id: { type: GraphQLID },
    header: { type: GraphQLString },
    sub_header: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await updateMenuChoice(args, context),
}

const removeMenuChoice = {
  type: MenuChoiceType,
  description: 'Delete a menu choice',
  args: {
    menu_choice_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await deleteMenuChoice(args, context),
}

const connectMenuChoicesToMenuItem = {
  type: MenuChoiceType,
  description: 'Connect a menu choice to a menu item',
  args: {
    menu_choice_ids: { type: new GraphQLList(GraphQLID) },
    menu_item_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await connectingMenuChoiceToMenuItem(args, context),
}

const removeMenuChoicesMenuItemsConnection = {
  type: MenuChoiceType,
  description: 'Connect a menu choice to a menu item',
  args: {
    menu_choice_ids: { type: new GraphQLList(GraphQLID) },
    menu_item_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await removingMenuChoicesMenuItemsConnection(args, context),
}

module.exports = {
  addMenuChoice,
  editMenuChoice,
  removeMenuChoice,
  connectMenuChoicesToMenuItem,
  removeMenuChoicesMenuItemsConnection,
}
