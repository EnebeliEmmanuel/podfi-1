import { proxy, subscribe, useSnapshot } from 'valtio'
import { z } from 'zod'

export type SignedOutState = {
  status: 'signed-out'
  user: null
}

const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  profilePictureUrl: z.string(),
  tokens: z.number(),
})

export type User = z.infer<typeof UserSchema>

export type SignedInState = {
  status: 'signed-in'
  user: User
}

type Store = SignedInState | SignedOutState

const STORAGE_KEY = 'podfi-auth'

const _defaultStoreValue = {
  status: 'signed-out',
  user: null
}

const initStore = () => {
  const rawItem = window.localStorage.getItem(STORAGE_KEY)
  if (!rawItem)
    return _defaultStoreValue

  try {
    return UserSchema.parse(JSON.parse(rawItem))
  }
  catch {
    return _defaultStoreValue
  }
}

const store = proxy<Store>(initStore())

export const useStore = () => useSnapshot(store)

subscribe(store, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
})
