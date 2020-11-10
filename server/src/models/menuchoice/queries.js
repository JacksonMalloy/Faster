const { getMenuChoiceById, getAllMenuChoicesByOrganization } = require('./resolvers')
const { MenuChoiceType } = require('../../typeDefs/menuchoice')

const { GraphQLList, GraphQLID } = require('graphql')

const menuChoice = {
  type: MenuChoiceType,
  description: 'Get a menu choice by ID',
  args: { menu_choice_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getMenuChoiceById(args, context),
}

const menuChoicesByOrganization = {
  type: new GraphQLList(MenuChoiceType),
  description: 'Get the menu choices in a menu',
  args: { organization_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getAllMenuChoicesByOrganization(args, context),
}

module.exports = { menuChoice, menuChoicesByOrganization }
