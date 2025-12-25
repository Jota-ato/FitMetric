// src/components/RegistationForm.tsx
import { useForm, type SubmitHandler } from "react-hook-form"
import { usePatientStore } from "../stores/PatientStore"
import type { GenderType, RegistrationFields } from "../types"
import InputContainter from "./InputContainter"
import CenterContainer from "./CenterContainer"
import FormContainer from "./FormContainer"
import { usePageStore } from "../stores/PageStore"



export default function RegistationForm() {
    const setPatientData = usePatientStore(state => state.setPatientData)
    const { name, weight, height, age, sex } = usePatientStore()
    const setStep = usePageStore(state => state.setStep)
    const setIsFullBasicInfo = usePageStore(state => state.setIsFullBasicInfo)

    // 1. Añadimos defaultValues para que el select no inicie en un estado inválido "selected"
    const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFields>({
        defaultValues: {
            sex: "" as GenderType // Iniciamos vacío para forzar la validación
        }
    })

    const onSubmit: SubmitHandler<RegistrationFields> = (data) => {
        // Al usar valueAsNumber en el register, data ya trae números
        setPatientData(data)
        if (name && weight > 0 && height > 0 && age > 0 && sex) {
            setIsFullBasicInfo({ name, weight, height, age, sex })
            setStep(2)
        }
    }

    return (
        <CenterContainer>
            <FormContainer>
                {/* 2. Simplificamos la llamada a handleSubmit */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="space-y-8">
                        <legend className="text-4xl font-bold">Información Personal</legend>

                        <InputContainter
                            label="Nombre"
                            placeholder="Tu nombre"
                            error={errors.name?.message}
                            {...register("name", { required: "El nombre es obligatorio" })}
                        />

                        <InputContainter
                            label="Peso (kg)"
                            type="number"
                            placeholder="70"
                            error={errors.weight?.message}
                            {...register("weight", {
                                required: "Indica tu peso",
                                min: { value: 20, message: "Mínimo 20kg" },
                                valueAsNumber: true
                            })}
                        />

                        <InputContainter
                            label="Altura (cm)"
                            type="number"
                            placeholder="180"
                            error={errors.height?.message}
                            {...register("height", {
                                required: "Indica tu altura",
                                min: { value: 100, message: "Mínimo 100cm" },
                                valueAsNumber: true
                            })}
                        />

                        <InputContainter
                            label="Edad"
                            type="number"
                            placeholder="25"
                            error={errors.age?.message}
                            {...register("age", {
                                required: "Indica tu edad",
                                min: { value: 12, message: "Debes ser mayor de 12 años" },
                                valueAsNumber: true
                            })}
                        />

                        <div className="space-y-4">
                            <label htmlFor="sex" className="block text-2xl font-semibold">Género</label>
                            <select
                                id="sex"
                                className={`text-2xl block border-b focus:outline-none w-full focus:bg-surface ${errors.sex ? "border-red-500" : "border-text-main"
                                    }`}
                                {...register("sex", { required: "Selecciona un género" })}
                            >
                                <option value="" defaultValue={"Selecciona tu género"} disabled>Selecciona tu género</option>
                                <option value="Male">Masculino</option>
                                <option value="Female">Femenino</option>
                            </select>
                            {/* 4. IMPORTANTE: Mostrar error del select */}
                            {errors.sex && <p className="text-red-500 text-xl mt-1">{errors.sex.message}</p>}
                        </div>

                        <button type="submit" className="bg-primary text-main font-bold text-2xl p-4 w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                            Continuar
                        </button>
                    </fieldset>
                </form>
            </FormContainer>
        </CenterContainer >
    )
}