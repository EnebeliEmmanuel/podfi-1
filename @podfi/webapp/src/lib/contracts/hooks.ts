import { config } from "@/lib/config"
import hardhatArtifacts from "@podfi/contracts/artifacts/build-info/6801460c8e12bc2c1de64654dedb9113.json"
import { useReadContract } from 'wagmi'

const podfiAbi = hardhatArtifacts.output.contracts["contracts/Podfi.sol"].Podfi.abi

export const usePodfiContract = () =>
  useReadContract({
    abi: podfiAbi,
    address: config.podfi.contractAddress,
  });
