import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import '@typechain/hardhat'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
// import "@nomicfoundation/hardhat-verify";
import { HardhatUserConfig } from "hardhat/config";
import "./tasks"
import { config  } from "./src/config"

export default {
  solidity: '0.8.20',
  typechain: {
    outDir: 'src/typechain',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false,
    externalArtifacts: ['externalArtifacts/*.json'],
    dontOverrideCompile: false
  },
  etherscan: {
    apiKey: config.networks.sepolia.etherscanApiKey,
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: config.networks.sepolia.rpcUrl,
      accounts: config.networks.sepolia.accounts
    }
  }
} satisfies HardhatUserConfig
