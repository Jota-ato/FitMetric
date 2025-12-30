
export default function CaloriesCard({ name, calories }: { name: string, calories: number }) {
    return (
        <div className="col-span-2 bg-surface-gray rounded-xl p-4 border border-surface-dark space-y-4">
            <h2 className="md:text-3xl text-2xl font-bold">{name}</h2>
            <p className="text-2xl font-bold"><span className="font-black text-primary">{Math.round(calories)}</span>{' '}
                Calorías al día</p>
        </div>
    )
}
