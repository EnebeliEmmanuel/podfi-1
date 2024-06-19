import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { UserStorage } from "@podfi/contracts/types/contracts/UserStorage"
import { isError } from "ethers"
import { contracts } from "../contracts"


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

  const { contract } = contracts.hooks.usePodfiContract()
  const { data, status, error } = useContractRead(
    contract,
    "getUserProfile",
  );

  if (!address)
    return {
      status: 'signed-out'
    }

  if (status === 'error') {
    if (isError(error, "CALL_EXCEPTION")) {
      if (error.reason === 'INEXISTENT_USER')
        return {
          status: 'onboarding',
          address,
        }
    }

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
