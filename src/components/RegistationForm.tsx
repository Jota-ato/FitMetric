
import type { RegistrationInputType } from "../types"
import InputContainter from "./InputContainter"
import CenterContainer from "./CenterContainer"
import FormContainer from "./FormContainer"

export default function RegistationForm() {
    /**
     * @type {Record<string, RegistrationInputType>}
     * Basic information for the user
     */

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
        }
    }
    const genderOptions = ["Male", "Female"]

    return (
        <CenterContainer>
            <FormContainer>
                <form>
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
                                className="text-2xl font-semibold bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity w-full cursor-pointer"
                            >
                                Continuar
                            </button>
                        </div>
                    </fieldset>
                </form>
            </FormContainer>
        </CenterContainer>
    )
}
