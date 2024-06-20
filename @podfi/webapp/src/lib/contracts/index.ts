import * as helpers from './helpers'
import hardhatArtifacts from "@podfi/contracts/artifacts"

const podfiAbi = hardhatArtifacts.output.contracts["contracts/Podfi.sol"].Podfi.abi

export const contracts = {
  abi: {
    podfi: podfiAbi
  },
  helpers
}
