
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { GenderType } from "../types"

interface BasicInfo {
    name: string
    weight: number
    height: number
    age: number
    sex: GenderType | null
}

export type PageStoreType = {
    isBasicInfoFull: boolean
    step: number
    setIsFullBasicInfo: (basicInfo: BasicInfo) => void
    setStep: (step: number) => void
}

export const usePageStore = create<PageStoreType>()(
    persist(
        (set) => ({
            isBasicInfoFull: false,
            step: 1,
            setIsFullBasicInfo: (basicInfo: BasicInfo) => {
                const isFull = Object.values(basicInfo).every(value => value !== null && value !== "" && value > 0)
                set({ isBasicInfoFull: isFull })
            },
            setStep: (step: number) => set({ step })
        }),
        {
            name: 'page-storage',
            partialize(state) {
                return {
                    isBasicInfoFull: state.isBasicInfoFull
                }
            },
        }
    )
)