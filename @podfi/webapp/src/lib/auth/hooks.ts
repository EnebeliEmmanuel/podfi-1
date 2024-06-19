import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { config } from "@/lib/config"
import { UserStorage } from "@podfi/contracts/typechain/contracts/UserStorage"

type User = UserStorage.UserStruct

export type SignedOutState = {
  status: 'signed-out'
  user?: undefined
}

export type SignedInState = {
  status: 'signed-in'
  address: string
  user: User
}

export type LoadingState = {
  status: 'loading'
  user?: undefined
}

export type ErrorState = {
  status: 'error'
  user?: undefined
}

export type OnboardingState = {
  status: 'onboarding'
  address: string
  user?: undefined
}

type AuthState = SignedInState | SignedOutState | OnboardingState | LoadingState | ErrorState

export const useAuthUnsafe = () => {
  const auth = useAuth()

  return auth as SignedInState
}

export const useAuth = (): AuthState => {
  const address = useAddress()

  const { contract } = useContract(config.podfi.contractAddress);
  const { data, status, error } = useContractRead(
    contract,
    "getUserProfile",
    [],
  );

  if (!address)
    return {
      status: 'signed-out'
    }

  if (status === 'error') {
    // console.log(error)

    return {
      status: 'error'
    }
  }

  if (status === 'loading')
    return {
      status: 'loading'
    }

  const user: User = data

  return {
    status: 'signed-in',
    address,
    user
  }
}
