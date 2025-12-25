
import type { RegistrationInputType } from "../types"
import InputContainter from "./InputContainter"

export default function RegistationForm() {

    const RegistrationFormInputs: Record<string, RegistrationInputType> = {
        name: {
            label: "Nombre",
            name: "name",
            placeholder: "Nombre"
        },
        age: {
            label: "Edad",
            name: "age",
            placeholder: "Edad",
            type: "number"
        },
        weight: {
            label: "Peso",
            name: "weight",
            placeholder: "Peso",
            type: "number"
        },
        height: {
            label: "Altura",
            name: "height",
            placeholder: "Altura",
            type: "number"
        },
        gender: {
            label: "Género",
            name: "gender",
            placeholder: "Género"
        }
    }
    const genderOptions = ["Male", "Female"]

    return (
        <section className="flex justify-center items-center h-screen w-screen">
            <form className="bg-surface p-16 rounded-xl w-[90%] max-w-400">
                <fieldset className="space-y-4">
                    <legend className="text-4xl font-bold">Información Personal</legend>

                    {Object.entries(RegistrationFormInputs).map(([key, value]) => (
                        <InputContainter
                            key={key}
                            label={value.label}
                            name={value.name}
                            placeholder={value.placeholder}
                            type={value.type}
                        />
                    ))}

                    <div className="space-y-4">
                        <label htmlFor="gender" className="block text-2xl font-semibold">Género</label>
                        <select
                            id="gender"
                            name="gender"
                            className="text-2xl block border-b border-text-main focus:outline-none bg-transparent w-full focus:bg-bg"
                        >
                            <option value="_" disabled selected>Selecciona tu género</option>
                            {genderOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="text-2xl font-semibold bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity w-full"
                        >
                            Continuar
                        </button>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}
