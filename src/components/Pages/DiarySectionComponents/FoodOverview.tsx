import type { USDASFood } from "../../../types/usdaTypes";


export default function FoodOverview({ food }: { food: USDASFood }) {
    return (
        <div className="p-4 border border-surface-gray-dark rounded-xl">
            <p>{food.description}</p>
        </div>
    )
}
