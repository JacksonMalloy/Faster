import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { GlobalStyle } from 'components/GlobalStyle'
import { GlobalLayout } from 'components/common/layout/GlobalLayout'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import { ManagedUIContext } from '../components/Context'

// global styles are required to be added to `_app.js` per Next.js requirements.
// import 'nprogress/nprogress.css'

const TopProgressBar = dynamic(
  () => {
    return import('components/TopProgressBar')
  },
  { ssr: false }
)

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ManagedUIContext>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <TopProgressBar />
        <GlobalLayout>
          <Component {...pageProps} />
        </GlobalLayout>
      </ApolloProvider>
    </ManagedUIContext>
  )
}
