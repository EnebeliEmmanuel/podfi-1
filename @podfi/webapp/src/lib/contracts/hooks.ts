import { config } from "@/lib/config"
// import hardhatArtifacts from "@podfi/contracts/artifacts/build-info/6801460c8e12bc2c1de64654dedb9113.json"
import { useReadContract } from 'wagmi'

// const podfiAbi = hardhatArtifacts.output.contracts["contracts/Podfi.sol"].Podfi.abi
const podfiAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      }
    ],
    "name": "getUserByUsername",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "profilePictureHash",
            "type": "string"
          }
        ],
        "internalType": "struct UserStorage.User",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserProfile",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "profilePictureHash",
            "type": "string"
          }
        ],
        "internalType": "struct UserStorage.User",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_profilePictureHash",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_contentId",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_creatorAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "enum ContentStorage.ContentType",
        "name": "_type",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "_isStreaming",
        "type": "bool"
      }
    ],
    "name": "storeContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const usePodfiContract = () =>
  useReadContract({
    abi: podfiAbi,
    address: config.podfi.contractAddress,
  });
