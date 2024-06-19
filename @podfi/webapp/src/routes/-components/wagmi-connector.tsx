import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { DedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import { config } from "@/lib/config"
import { FunctionComponent, ReactNode } from "react";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

export const WagmiProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiConfig config={
      createConfig({
        autoConnect: true,
        publicClient,
        webSocketPublicClient,
        connectors: [
          new DedicatedWalletConnector({
            chains,
            options: {
              apiKey: config.magic.publicKey,
              isDarkMode: true,
              /* If using OAuth, make sure to enable OAuth options from magic dashboard */
              oauthOptions: {
                providers: ["google"],
              },
              magicSdkConfiguration: {
                network: {
                  rpcUrl: 'https://11155111.rpc.thirdweb.com',
                  chainId: 11155111,
                },
              },
            },
          }),
        ],
      })
    }>
      {children}
    </WagmiConfig>
  )
}
