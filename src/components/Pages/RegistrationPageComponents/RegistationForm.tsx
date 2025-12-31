// src/components/RegistationForm.tsx
import { useForm, type SubmitHandler } from "react-hook-form"
import { usePatientStore } from "../../../stores/PatientStore"
import type { GenderType, RegistrationFields } from "../../../types"
import InputContainter from "./InputContainter"
import FormContainer from "./FormContainer"
import { usePageStore } from "../../../stores/PageStore"
import { useLocation, useNavigate } from "react-router"


export default function RegistationForm() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const setPatientData = usePatientStore(state => state.setPatientData)
    const { basicInfo: { name: nameFromPatient, weight: weightFromPatient, height: heightFromPatient, age: ageFromPatient, sex: sexFromPatient } } = usePatientStore()
    const setStep = usePageStore(state => state.setStep)
    const setIsFullBasicInfo = usePageStore(state => state.setIsFullBasicInfo)

    const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFields>({
        defaultValues: {
            name: nameFromPatient === undefined ? "" : nameFromPatient,
            weight: weightFromPatient === 0 ? undefined : weightFromPatient,
            height: heightFromPatient === 0 ? undefined : heightFromPatient,
            age: ageFromPatient === 0 ? undefined : ageFromPatient,
            sex: sexFromPatient === undefined ? "" as GenderType : sexFromPatient
        }
    })

    const onSubmit: SubmitHandler<RegistrationFields> = (data) => {
        const { name, age, height, sex, weight } = data
        if (name && (age > 0) && (height > 0) && (weight > 0) && sex) {
            setPatientData({ basicInfo: data })
            setIsFullBasicInfo({ name, weight, height, age, sex })
            if (pathname === "/profile/edit-basic-info") {
                navigate('/profile')
            } else {
                setStep(2)
            }
        }
    }

    return (
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
                            className={`text-2xl  block border-b focus:outline-none w-full focus:bg-surface ${errors.sex ? "border-red-500" : "border-text-main"
                                }`}
                            defaultValue={"Selecciona tu género"}
                            {...register("sex", { required: "Selecciona un género" })}
                        >
                            <option disabled>Selecciona tu género</option>
                            <option value="Male">Masculino</option>
                            <option value="Female">Femenino</option>
                        </select>
                        {errors.sex && <p className="text-red-500 text-xl mt-1">{errors.sex.message}</p>}
                    </div>

                    <button type="submit" className="bg-primary text-main font-bold text-2xl p-4 w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                        {pathname === "/profile/edit-basic-info" ? "Guardar cambios" : "Continuar"}
                    </button>
                </fieldset>
            </form>
        </FormContainer>
    )
}