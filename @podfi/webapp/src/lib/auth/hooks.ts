import { useStore } from "./store"

export const useAuthUnsafe = () => {
  const { user } = useStore()

  return user
}

export const useAuth = () =>
  useStore()
