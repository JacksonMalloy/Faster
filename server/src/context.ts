import { getUser } from './utils'
import { createLoaders } from './loaders'
import { PubSub } from 'apollo-server'

const pubsub = new PubSub()

export const context = async ({ req }: any) => {
  const user = await getUser(req)
  const loaders = createLoaders(user)

  console.log({ user })

  return { user, pubsub, loaders }
}
