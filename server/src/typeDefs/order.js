const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLID, GraphQLInt } = require('graphql')

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

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    order_id: { type: GraphQLID },
    total: { type: GraphQLInt },
    admin_id: { type: GraphQLID },
    customer_id: { type: GraphQLID },
    charge: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
})

module.exports = { OrderType }
