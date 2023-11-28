import { create } from "zustand"
import { persist } from 'zustand/middleware'

interface RefreshStore {
  isSubscribedEventsRefresh: boolean
  setIsSubscribedEventsRefresh: (isRefresh: boolean) => void
  isRegisteredEventsRefresh: boolean
  setIsRegisteredEventsRefresh: (isRefresh: boolean) => void
  isSubscribedDepartmentRefresh: boolean
  setIsSubscribedDepartmentRefresh: (isRefresh: boolean) => void
}

export const useRefreshStore = create<RefreshStore>()(
  persist(
    (set) => ({
      isSubscribedEventsRefresh: false,
      setIsSubscribedEventsRefresh: (isRefresh: boolean) => set(() => ({ isSubscribedEventsRefresh: isRefresh })),
      isRegisteredEventsRefresh: false,
      setIsRegisteredEventsRefresh: (isRefresh: boolean) => set(() => ({ isRegisteredEventsRefresh: isRefresh })),
      isSubscribedDepartmentRefresh: false,
      setIsSubscribedDepartmentRefresh: (isRefresh: boolean) => set(() => ({ isSubscribedDepartmentRefresh: isRefresh })),
    }),
    {
      name: 'refresh-store'
    }
  )
)

