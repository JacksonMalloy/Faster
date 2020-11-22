import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { HttpLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'

// Use on the server
const httpLink = new HttpLink({
  uri: `http://fm-server-v2:8080/graphql/`,
  credentials: `include`,
})

// Use on the client
const uploadLink = createUploadLink({
  uri: `/api`,
  credentials: `same-origin`,
})

const cartLink = new HttpLink({
  uri: `https://api.cartql.com`,
})

let apolloClient: ApolloClient<NormalizedCacheObject>

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('auth_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link:
      typeof window === 'undefined'
        ? // Serverside
          authLink.concat(httpLink)
        : // Clientside
          authLink.concat(uploadLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            menu: {
              merge(existing, incoming) {
                return { ...existing, ...incoming }
              },
            },
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
