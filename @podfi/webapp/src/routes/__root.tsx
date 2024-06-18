import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ModalProvider } from "@particle-network/connect-react-ui"; // @particle-network/connectkit to use Auth Core
import { WalletEntryPosition } from "@particle-network/auth";
import { Ethereum, EthereumSepolia } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connect";
import { config } from "@/lib/config"
import { FunctionComponent, ReactNode } from 'react';

export const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />
      <Devtools />
    </Providers>
  ),
})

const Providers: FunctionComponent<{ children: ReactNode }> = () =>
  <QueryClientProvider client={queryClient}>
    <ModalProvider
      options={{
        projectId: config.particle.projectId,
        clientKey: config.particle.clientKey,
        appId: config.particle.appId,
        chains: [Ethereum, EthereumSepolia],
        particleWalletEntry: {
          //optional: particle wallet config
          displayWalletEntry: true, //display wallet button when connect particle success.
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains: [Ethereum, EthereumSepolia],
          customStyle: {}, //optional: custom wallet style
        },
        // securityAccount: {
        //   //optional: particle security account config
        //   //prompt set payment password. 0: None, 1: Once(default), 2: Always
        //   promptSettingWhenSign: 1,
        //   //prompt set master password. 0: None(default), 1: Once, 2: Always
        //   promptMasterPasswordSettingWhenLogin: 1,
        // },
        wallets: evmWallets({
          projectId: config.walletconnect.projectId, //replace with walletconnect projectId
        }),
      }}
      theme={"auto"}
      language={"en"} //optional:localize, default en
      walletSort={["Particle Auth", "Wallet"]} //optional:walelt order
      particleAuthSort={[
        //optional:display particle auth items and order
        "email",
        "phone",
        "google",
        "apple",
        "facebook",
      ]}
    >
      <Outlet />
    </ModalProvider>
  </QueryClientProvider>

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

