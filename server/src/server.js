const express = require('express')
const { graphqlHTTP, getGraphQLParams } = require('express-graphql')
const schema = require('./schema')
const pool = require('./db/config')
const { applyMiddleware } = require('graphql-middleware')
const { permissions } = require('./permissions')
const { graphqlUploadExpress } = require('graphql-upload')
const { getUserId } = require('./utils')
const expressPlayground = require('graphql-playground-middleware-express').default
const { createServer } = require('http')

const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')

require('dotenv').config()

// Add when want to use graphql-shield!
// const schemaWithPermissions = applyMiddleware(schema, permissions)
const subscriptionEndpoint = `ws://fm-server:8080/subscriptions`

const app = express()

// Fix CORS
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', 'http://localhost:3030') // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Headers", "Accept");
  next()
})

app.use('/graphql', (request, response, next) => {
  // File uploads
  // graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })

  // Logging
  getGraphQLParams(request).then((params) => {
    console.log(params)
  })

  graphqlHTTP({
    // Schema
    schema: schema,

    // Graphiql -- turn off in production
    graphiql: { subscriptionEndpoint: subscriptionEndpoint },

    // Context
    context: {
      pool: pool,
      request: request,
    },
  })(request, response, next)
})

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

const ws = createServer(app)

ws.listen(8080, () => {
  console.log(`GraphQL is now running on http://localhost:8080`)
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect,
      onOperation,
      onDisconnect,
    },
    {
      server: ws,
      // Use this in the client
      path: '/subscriptions',
    }
  )
})

//logging
const onOperation = function (message, params, WebSocket) {
  console.log('subscription' + message.payload, params)
  return Promise.resolve(Object.assign({}, params, { context: message.payload.context }))
}
//logging
const onConnect = function (connectionParams, WebSocket) {
  console.log('connecting ....')
}
//loggging
const onDisconnect = function (WebSocket) {
  console.log('disconnecting ...')
}
