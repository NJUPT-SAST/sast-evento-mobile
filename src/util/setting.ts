import { create } from "zustand"
import { persist } from 'zustand/middleware'

interface SettingStore {
  isGuestMode?: boolean
  setIsGuestMode: (isGuestMode: boolean) => void

}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      isGuestMode: false,
      setIsGuestMode: (isGuestMode) => set({ isGuestMode }),
    }),
    {
      name: 'setting-store'
    }
  )
)