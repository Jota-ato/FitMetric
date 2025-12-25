
import type { RegistrationInputType } from "../types"

export default function InputContainter({ label, name, placeholder, type = "text" }: RegistrationInputType) {
    /**
     * @type {RegistrationInputType}
     * Input container for the registration form
     */
    return (
        <div className="space-y-4">
            <label htmlFor={name} className="block text-2xl font-semibold">{label}</label>
            <input
                id={name}
                name={name}
                placeholder={placeholder}
                className="text-2xl block border-b border-text-main focus:outline-none bg-transparent w-full"
                type={type}
            />
        </div>
    )
}
