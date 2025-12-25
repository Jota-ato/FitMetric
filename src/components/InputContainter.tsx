// src/components/InputContainter.tsx
import { forwardRef } from "react"
import type { RegistrationInputType } from "../types"

interface InputProps extends RegistrationInputType {
    error?: string // Añadimos soporte para mostrar errores
}

const InputContainter = forwardRef<HTMLInputElement, InputProps>(
    ({ label, name, placeholder, type = "text", error, ...rest }, ref) => {
        return (
            <div className="space-y-4">
                <label htmlFor={name} className="block text-2xl font-semibold">{label}</label>
                <input
                    {...rest}   // Contiene onChange, onBlur y name de react-hook-form
                    ref={ref}    // Conecta la referencia
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className={`text-2xl transition-colors duration-300 block border-b focus:outline-none bg-transparent w-full ${error ? "border-red-500" : "border-text-main"
                        }`}
                    type={type}
                />
                {error && <p className="text-red-500 text-xl mt-1">{error}</p>}
            </div>
        )
    }
)

InputContainter.displayName = "InputContainter"
export default InputContainter