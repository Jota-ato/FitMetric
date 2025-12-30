// components/food/detail/EmptyState.tsx

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="text-6xl opacity-30">🍽️</div>
            <p className="text-xl text-muted">No hay comida seleccionada</p>
            <p className="text-sm text-muted/70">Selecciona un alimento para ver sus detalles nutricionales</p>
        </div>
    )
}

// components/food/detail/LoadingState.tsx

import Spinner from "../../../Spinner"

export function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <Spinner />
        </div>
    )
}