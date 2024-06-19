import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FunctionComponent, ReactNode, useEffect } from 'react';

import { Toaster } from '@/components/ui/toaster'
import { Provider } from './-components/wagmi-connector'
import { OnboardingProvider } from './-components/onboarding'

export const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />
      <Toaster />
      <Devtools />
    </Providers>
  ),
})

const Providers: FunctionComponent<{ children: ReactNode }> = () => {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <OnboardingProvider>
          <Outlet />
        </OnboardingProvider>
      </QueryClientProvider>
    </Provider>
  )
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

