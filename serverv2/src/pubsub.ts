import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

const options = {
  host: 'fm-redis',
  port: 6379,
  retryStrategy: (times: any) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
}

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
})

module.exports = pubsub
