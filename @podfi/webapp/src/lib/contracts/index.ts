import * as hooks from "./hooks"
import * as helpers from './helpers'
import hardhatArtifacts from "@podfi/contracts/artifacts/build-info/b9e605ee6081d488dfa8b576a04ee7c4.json"

const podfiAbi = hardhatArtifacts.output.contracts["contracts/Podfi.sol"].Podfi.abi

export const contracts = {
  hooks,
  abi: {
    podfi: podfiAbi
  },
  helpers
}
