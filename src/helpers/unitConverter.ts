// helpers/unitConverter.ts

/**
 * Obtiene las unidades disponibles para conversión según la unidad base
 */
export function getAvailableUnits(baseUnit?: string): string[] {
    if (!baseUnit) return ["1 unidad"]

    const lowerUnit = baseUnit.toLowerCase()

    // Si es gramos, mostrar kg y mg
    if (lowerUnit === "g") {
        return ["g", "kg", "mg"]
    }

    // Si es mililitros, mostrar litros
    if (lowerUnit === "ml") {
        return ["ml", "L"]
    }

    // Si es kilogramos, mostrar gramos
    if (lowerUnit === "kg") {
        return ["kg", "g", "mg"]
    }

    // Si es litros, mostrar mililitros
    if (lowerUnit === "l") {
        return ["L", "ml"]
    }

    // Si no hay conversión disponible, solo mostrar la unidad base
    return [baseUnit, "1 unidad"]
}

/**
 * Convierte un valor de una unidad a otra
 */
export function convertUnit(value: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === toUnit) return value

    const lowerFrom = fromUnit.toLowerCase()
    const lowerTo = toUnit.toLowerCase()

    // Conversiones de peso
    if (lowerFrom === "g" && lowerTo === "kg") return value / 1000
    if (lowerFrom === "g" && lowerTo === "mg") return value * 1000
    if (lowerFrom === "kg" && lowerTo === "g") return value * 1000
    if (lowerFrom === "kg" && lowerTo === "mg") return value * 1000000
    if (lowerFrom === "mg" && lowerTo === "g") return value / 1000
    if (lowerFrom === "mg" && lowerTo === "kg") return value / 1000000

    // Conversiones de volumen
    if (lowerFrom === "ml" && lowerTo === "l") return value / 1000
    if (lowerFrom === "l" && lowerTo === "ml") return value * 1000

    return value
}