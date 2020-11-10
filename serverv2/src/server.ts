import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'

import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import { context } from './context'

const PORT = 8080

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  schema,
  subscriptions: {
    path: `/subscriptions`,
    // keepAlive: 1,
    onConnect: (connectionParams, webSocket, context) => {
      console.log(`CONNECTED`)
      console.log({ connectionParams })
      // if (connectionParams.authToken) {
      //   return validateToken(connectionParams.authToken)
      //     .then(findUser(connectionParams.authToken))
      //     .then((user) => {
      //       return {
      //         currentUser: user,
      //       }
      //     })
      // }

      // throw new Error('Missing auth token!')
    },

    onDisconnect: (websocket, context) => {
      console.log(`Disconnected`)
    },
  },
  context,
})

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at http://admin.faster.menu:8080/api`)
  // console.log({ subscriptionsUrl })
})
