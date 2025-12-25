import { useForm, type SubmitHandler } from "react-hook-form"
import { usePatientStore } from "../stores/PatientStore"
import type { GoalType, PurposeType } from "../types"
import CenterContainer from "./CenterContainer"
import FormContainer from "./FormContainer"
import { usePageStore } from "../stores/PageStore"

type DetailInformationInputsType = {
    goal: GoalType
    purpose: PurposeType
}

export default function DetailInformationForm() {
    const setPatientData = usePatientStore(state => state.setPatientData)
    const setStep = usePageStore(state => state.setStep)

    // 1. Añadimos defaultValues para que el select no inicie en un estado inválido "selected"
    const { register, handleSubmit, formState: { errors } } = useForm<DetailInformationInputsType>({
        defaultValues: {
            goal: "" as GoalType, // Iniciamos vacío para forzar la validación
            purpose: "" as PurposeType // Iniciamos vacío para forzar la validación
        }
    })

    const onSubmit: SubmitHandler<DetailInformationInputsType> = (data) => {
        setPatientData(data)
        setStep(3)
    }

    return (
        <CenterContainer>
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="space-y-8">
                        <legend className="text-4xl font-bold">Objetivos y propósitos</legend>

                        <div className="space-y-4">
                            <label htmlFor="goal" className="block text-2xl font-semibold">Objetivo</label>
                            <select
                                id="goal"
                                className={`text-2xl block border-b focus:outline-none w-full focus:bg-surface ${errors.goal ? "border-red-500" : "border-text-main"
                                    }`}
                                {...register("goal", { required: "Selecciona un objetivo" })}
                            >
                                <option value="" defaultValue={"Selecciona tu objetivo"} disabled>Selecciona tu objetivo</option>
                                <option value="Gain Weight">Ganar peso</option>
                                <option value="Maintain Weight">Mantener peso</option>
                                <option value="Lose Weight">Perder peso</option>
                            </select>
                            {/* 4. IMPORTANTE: Mostrar error del select */}
                            {errors.goal && <p className="text-red-500 text-xl mt-1">{errors.goal.message}</p>}
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="purpose" className="block text-2xl font-semibold">Propósito</label>
                            <select
                                id="purpose"
                                className={`text-2xl block border-b focus:outline-none w-full focus:bg-surface ${errors.purpose ? "border-red-500" : "border-text-main"
                                    }`}
                                {...register("purpose", { required: "Selecciona un propósito" })}
                            >
                                <option value="" defaultValue={"Selecciona tu propósito"} disabled>Selecciona tu propósito</option>
                                <option value="Gain Muscle">Ganar músculo</option>
                                <option value="Maintain Muscle">Mantenimiento composición corporal</option>
                                <option value="Lose Fat">Perder grasa corporal</option>
                            </select>
                            {/* 4. IMPORTANTE: Mostrar error del select */}
                            {errors.purpose && <p className="text-red-500 text-xl mt-1">{errors.purpose.message}</p>}
                        </div>

                        <button type="submit" className="bg-primary text-main font-bold text-2xl p-4 w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                            Finalizar formulario
                        </button>
                    </fieldset>
                </form>
            </FormContainer>
        </CenterContainer>
    )
}
