const {
  createMenuSelection,
  deleteMenuSelection,
  updateMenuSelection,
  connectingMenuSelectionToMenuChoice,
  removingMenuSelectionsMenuChoicesConnection,
} = require('./resolvers')
const { MenuSelectionType } = require('../../typeDefs/menuselection')

const { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql')

const addMenuSelection = {
  type: MenuSelectionType,
  description: 'Add a menu selection',
  args: {
    organization_id: { type: GraphQLID },
    menu_item_id: { type: GraphQLID },
    name: { type: GraphQLString },
    value_add: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await createMenuSelection(args, context),
}

const editMenuSelection = {
  type: MenuSelectionType,
  description: 'Edit a menu selection',
  args: {
    menu_selection_id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    value_add: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => await updateMenuSelection(args, context),
}

const removeMenuSelection = {
  type: MenuSelectionType,
  description: 'Delete a menu selection',
  args: { menu_selection_id: { type: GraphQLID } },

  resolve: async (obj, args, context, info) => await deleteMenuSelection(args, context),
}

const connectMenuSelectionsToMenuChoice = {
  type: MenuSelectionType,
  description: 'Connect a menu choice to a menu item',
  args: {
    menu_choice_id: { type: GraphQLID },
    menu_selection_ids: { type: new GraphQLList(GraphQLID) },
  },
  resolve: async (obj, args, context, info) => await connectingMenuSelectionToMenuChoice(args, context),
}

const removeMenuSelectionsMenuChoicesConnection = {
  type: MenuSelectionType,
  description: 'Disconnect menu selections from menu choices',
  args: {
    menu_choice_id: { type: GraphQLID },
    menu_selection_ids: { type: new GraphQLList(GraphQLID) },
  },
  resolve: async (obj, args, context, info) => await removingMenuSelectionsMenuChoicesConnection(args, context),
}

module.exports = {
  addMenuSelection,
  editMenuSelection,
  removeMenuSelection,
  connectMenuSelectionsToMenuChoice,
  removeMenuSelectionsMenuChoicesConnection,
}
