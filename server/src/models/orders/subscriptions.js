const {} = require('./resolvers')
const { OrderType } = require('../../typeDefs/order')
const { pubsub, CREATED_ORDER } = require('./constants')
const { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } = require('graphql')

const createMenuOrder = async ({ admin_id, customer_id, total, charge }, context) => {
  const query = `INSERT INTO "fm"."orders" (admin_id, customer_id, total, charge) VALUES ($1, $2, $3, $4) RETURNING *`
  const params = [admin_id, customer_id, total, charge]

  try {
    const result = await context.pool.query(query, params)

    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const newOrder = {
  type: OrderType,
  description: 'Listen for incoming orders',
  //   Neer to add args
  subscribe: () => pubsub.asyncIterator(CREATED_ORDER), // subscribe to addition of orders,
}

const createOrder = {
  type: OrderType,
  description: 'Create an Order',
  args: {
    admin_id: { type: GraphQLID },
    customer_id: { type: GraphQLID },
    total: { type: GraphQLInt },
    charge: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => {
    return await createMenuOrder(args, context).then((order) => {
      pubsub.publish(CREATED_ORDER, { newOrder: order })
      console.log({ order })
      return order
    })
  },
}

module.exports = {
  createOrder,
  newOrder,
}
