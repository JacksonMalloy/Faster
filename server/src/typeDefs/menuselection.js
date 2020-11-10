const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLID } = require('graphql')

const getMenuChoicesByMenuSelectionId = async (parent, args, context) => {
  // //console.log(`PARENT!: `, parent)
  // const query = `SELECT * FROM "fm"."menuchoices" mc INNER JOIN
  //                      "fm"."menuselections" ms
  //                 ON mc.menu_choice_id = ms.menu_choice_id
  //                 WHERE ms.menu_choice_id = $1`
  // const params = [parent.menu_choice_id]
  // try {
  //   const result = await context.pool.query(query, params)
  //   //console.log(result.rows)
  //   return result.rows
  // } catch (error) {
  //   //console.log(error)
  //   throw error
  // }
}

const MenuSelectionType = new GraphQLObjectType({
  name: 'MenuSelection',
  fields: () => ({
    organization_id: { type: GraphQLID },
    menu_selection_id: { type: GraphQLID },
    menu_choice_id: { type: GraphQLID },
    menu_item_id: { type: GraphQLID },
    name: { type: GraphQLString },
    value_add: { type: GraphQLString },
    selected: { type: GraphQLBoolean },
    // choices: {
    //   // To fix circular nodeJS dependancy issue
    //   type: new GraphQLList(require('./menuchoice').MenuChoiceType),
    //   resolve: async (parent, args, context, info) => await getMenuChoicesByMenuSelectionId(parent, args, context),
    // },
  }),
})

module.exports = { MenuSelectionType }
