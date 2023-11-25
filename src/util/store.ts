import { create } from "zustand"
import { devtools, persist } from 'zustand/middleware'
import { UserInfo } from "../context"

interface UserInfoStore {
  userInfo?: UserInfo
  rmUserInfo: () => void
  updateUserInfo: (userInfo: UserInfo | undefined) => void
}

export const useUserInfoStore = create<UserInfoStore>()(
  devtools(
    persist(
      (set) => ({
        userInfo: undefined,
        rmUserInfo: () => set({ userInfo: undefined }),
        updateUserInfo: (userInfo) => set({ userInfo }),
      }),
      {
        name: 'userInfo-store'
      })
  ),
)