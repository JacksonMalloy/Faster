const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLID } = require('graphql')

const { MenuSelectionType } = require('./menuselection')

const getMenuSelectionsByMenuChoice = async (parent, args, context) => {
  const query = `SELECT * FROM "fm"."menuselections" s
                 INNER JOIN "fm"."menuselections_to_menuchoices" msc
                  ON s.menu_selection_id = msc.menu_selection_id
                  INNER JOIN  "fm"."menuchoices" c
                  ON msc.menu_choice_id = c.menu_choice_id
                  WHERE c.menu_choice_id = $1`
  const params = [parent.menu_choice_id]
  try {
    const result = await context.pool.query(query, params)
    //console.log(result.rows)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const MenuChoiceType = new GraphQLObjectType({
  name: 'MenuChoice',
  fields: () => ({
    menu_choice_id: { type: GraphQLID },
    organization_id: { type: GraphQLID },
    menu_item_id: { type: GraphQLString },
    header: { type: GraphQLString },
    sub_header: { type: GraphQLString },
    selections: {
      type: new GraphQLList(MenuSelectionType),
      resolve: async (parent, args, context, info) => await getMenuSelectionsByMenuChoice(parent, args, context),
    },
  }),
})

module.exports = { MenuChoiceType }
