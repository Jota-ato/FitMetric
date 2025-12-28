
import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"
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
    devtools(persist(
        (set) => ({
            isBasicInfoFull: false,
            step: 1,
            setIsFullBasicInfo: (basicInfo: BasicInfo) => {
                const numberInfo = Object.values(basicInfo).filter(value => typeof value === 'number')
                const stringInfo = Object.values(basicInfo).filter(value => typeof value === 'string')
                const areNumberFull = numberInfo.every(value => value > 0)
                const areStringFull = stringInfo.every(value => value !== "")
                const isFull = areNumberFull && areStringFull
                set({ isBasicInfoFull: isFull })
            },
            setStep: (step: number) => set({ step })
        }),
        {
            name: 'page-storage',
            partialize(state) {
                return {
                    isBasicInfoFull: state.isBasicInfoFull,
                    step: state.step
                }
            },
        }
    )
    ))