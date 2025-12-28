
export default function CaloriesCard({ name, calories }: { name: string, calories: number }) {
    return (
        <div className="col-span-2 bg-gray-200 rounded-xl p-4 shadow border border-gray-300 dark:border-gray-600 space-y-4">
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="text-2xl font-bold"><span className="font-black text-primary">{calories}</span>{' '}
                Calorías al día</p>
        </div>
    )
}
