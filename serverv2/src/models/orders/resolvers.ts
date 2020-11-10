import OrderRepository from './repo'
// const { pubsub } = require('../../pubsub')
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

import { withFilter } from 'apollo-server'

export const OrderQueries = {
  // Order: async (parent, args, context, info) => {},
  // Orders: async (parent, args, context, info) => {},
}

const ORDER_CREATED = `ORDER_CREATED`

type CreateOrderArgs = {
  admin_id: number
  customer_id: number
  total: string
  charge: string
  organization_id: number
}

export const OrderMutations = {
  createOrder: async (parent: any, args: CreateOrderArgs, { pubsub }: any, info: any) => {
    const orderRepo = new OrderRepository()
    const order = await orderRepo.createMenuOrder(args)

    const { order: orderCreated } = order

    console.log(orderCreated)
    pubsub.publish(ORDER_CREATED, {
      // Payload
      orderCreated,
    })

    return order
  },
}

export const OrderSubscriptions = {
  orderCreated: {
    subscribe: withFilter(
      (parent, args, { pubsub }, info) => pubsub.asyncIterator(ORDER_CREATED),
      (payload, variables) => payload.orderCreated.organization_id === parseInt(variables.organization_id)
    ),
  },
}
