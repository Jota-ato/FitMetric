// components/food/detail/FoodHeader.tsx

interface FoodHeaderProps {
    description: string
    brandOwner?: string
}

export default function FoodHeader({ description, brandOwner }: FoodHeaderProps) {
    return (
        <header className="bg-linear-to-br from-accent/20 to-accent/5 p-6 rounded-2xl border border-accent/20 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                {description}
            </h2>
            {brandOwner && (
                <p className="text-muted text-lg md:text-xl flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
                    {brandOwner}
                </p>
            )}
        </header>
    )
}