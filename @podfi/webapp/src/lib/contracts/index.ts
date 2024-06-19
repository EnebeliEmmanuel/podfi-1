import * as hooks from "./hooks"
import * as helpers from './helpers'
import hardhatArtifacts from "@podfi/contracts/artifacts/build-info/6801460c8e12bc2c1de64654dedb9113.json"

const podfiAbi = hardhatArtifacts.output.contracts["contracts/Podfi.sol"].Podfi.abi

export const contracts = {
  hooks,
  abi: {
    podfi: podfiAbi
  },
  helpers
}
