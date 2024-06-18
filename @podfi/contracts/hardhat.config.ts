import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat'
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  typechain: {
    outDir: 'src/typechain',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false,
    externalArtifacts: ['externalArtifacts/*.json'],
    dontOverrideCompile: false
  },
}

export default config
