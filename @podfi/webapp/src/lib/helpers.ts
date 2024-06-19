import { config } from "./config"
import { contracts } from "./contracts"

const getUserByUsername = async (username: string) =>
  contracts.helpers.publicClient.readContract({
    address: config.podfi.contractAddress,
    abi: contracts.abi.podfi,
    functionName: 'getUserByUsername',
    args: [username],
  })

export const helpers = {
  getUserByUsername
}
