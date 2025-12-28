import { translateGender } from "../../helpers"
import type { GenderType } from "../../types"


type DataCardProps = {
    title: string,
    value: number | string | GenderType,
    unit?: string
}

export default function DataCard({ title, value, unit }: DataCardProps) {
    return (
        <div className="bg-gray-200 rounded-xl p-4 shadow border border-gray-300 dark:border-gray-600 space-y-4">
            <h3 className="text-3xl font-bold">{title}</h3>
            <p className="text-2xl font-bold">{typeof value !== "string" ? `${value}${unit}` : translateGender(value as GenderType)}</p>
        </div>
    )
}
