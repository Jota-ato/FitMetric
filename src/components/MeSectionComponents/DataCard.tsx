import { translateGender, translateGoal, translatePurpose } from "../../helpers"
import type { GenderType, GoalType, PurposeType } from "../../types"


type DataCardProps = {
    title: string,
    value: number | string | GenderType | GoalType | PurposeType,
    unit?: string
    tailwindStyles?: string
}

export default function DataCard({ title, value, unit, tailwindStyles }: DataCardProps) {

    return (
        <div className={`bg-gray-200 rounded-xl p-4 shadow border border-gray-300 dark:border-gray-600 space-y-4 ${tailwindStyles}`} >
            <h3 className="text-3xl font-bold">{title}</h3>
            {typeof value === "number" ? <p className="text-2xl font-bold">{value}{unit}</p> : (value === "Male" || value === "Female") ? <p className="text-2xl font-bold">{translateGender(value)}</p> : (value === "Gain Muscle" || value === "Maintain Muscle" || value === "Lose Fat") ? <p className="text-2xl font-bold">{translatePurpose(value as PurposeType)}</p> : <p className="text-2xl font-bold">{translateGoal(value as GoalType)}</p>}
        </div>
    )
}
