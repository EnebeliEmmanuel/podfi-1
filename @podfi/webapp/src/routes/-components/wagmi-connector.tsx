import { WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { FunctionComponent, ReactNode } from "react";
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { config } from '@/lib/config'

const metadata = {
  name: 'Web3Modal',
  description: 'Podfi',
  url: 'http://localhost',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}


const wagmiConfig = defaultWagmiConfig({
  chains: [sepolia],
  projectId: config.walletconnect.projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig,
  projectId: config.walletconnect.projectId,
  enableAnalytics: true,
  enableOnramp: true
})

export const Provider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
    </WagmiProvider>
  )
}
