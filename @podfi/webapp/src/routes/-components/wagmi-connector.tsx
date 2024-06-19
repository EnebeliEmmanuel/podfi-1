import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { DedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import Dashboard from "./components/Dashboard";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new DedicatedWalletConnector({
      chains,
      options: {
        apiKey: "PUBLISHABLE_API_KEY",
        isDarkMode: true,
        /* If using OAuth, make sure to enable OAuth options from magic dashboard */
        oauthOptions: {
          providers: [""],
        },
        magicSdkConfiguration: {
          network: {
            rpcUrl: RPC_URL,
            chainId: CHAIN_ID,
          },
        },
      },
    }),
  ],
});
