import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { config } from "@/lib/config"
import { FunctionComponent, ReactNode } from 'react';
import { ThirdwebProvider, embeddedWallet, metamaskWallet, smartWallet } from '@thirdweb-dev/react'
import { Sepolia, Localhost } from '@thirdweb-dev/chains'
import { auth } from '@/lib/auth'

export const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />
      <Devtools />
    </Providers>
  ),
})

const Providers: FunctionComponent<{ children: ReactNode }> = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        clientId={config.thirdweb.clientId}
        activeChain={Sepolia}
        supportedWallets={[
          smartWallet(embeddedWallet(), config.podfi.smartWallet),
          smartWallet(metamaskWallet(), config.podfi.smartWallet),
        ]}
      >
        <OnboardingProvider>
          <Outlet />
        </OnboardingProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}

const OnboardingProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const _auth = auth.hooks.useAuth()
  console.log(_auth)

  return children
}

const Devtools = () => {
  if (import.meta.env.MODE === 'production')
    return null

  return (
    <>
      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

