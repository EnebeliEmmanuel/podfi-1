import { config } from "./config"
import { contracts } from "./contracts"


const getCreator = async (username: string) => {
  const res = await contracts.helpers.publicClient.readContract({
    address: config.podfi.contractAddress,
    abi: contracts.abi.podfi,
    functionName: 'getUserByUsername',
    args: [username],
  })

  console.log(res)
}

export const helpers = {
  getCreator
}
