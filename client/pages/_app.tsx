import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SnackbarProvider } from "notistack";

import Layout from '@/components/Layout/Layout'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider preventDuplicate>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </QueryClientProvider>
  )
}
