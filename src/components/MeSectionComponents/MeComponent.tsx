import { usePatientStore } from "../../stores/PatientStore"
import CaloriesCard from "./CaloriesCard"
import DataCard from "./DataCard"

export default function MeComponent() {

    const name = usePatientStore(state => state.name)
    const weight = usePatientStore(state => state.weight)
    const height = usePatientStore(state => state.height)
    const age = usePatientStore(state => state.age)
    const sex = usePatientStore(state => state.sex)
    const BMR = usePatientStore(state => state.BMR)
    const TDEE = usePatientStore(state => state.TDEE)

    return (
        <section className="w-[90%] max-w-440 mx-auto">
            <h1 className="my-8 text-center text-6xl font-bold">Perfil ({name})</h1>
            <div className="text-text-main bg-surface p-8 rounded-xl shadow-card">
                <div className="grid md:grid-cols-4 gap-4">
                    <CaloriesCard name="Metabolismo basal" calories={BMR} />
                    <CaloriesCard name="Gasto energético diario" calories={TDEE} />
                    <DataCard
                        title="Peso"
                        value={weight}
                        unit="kg"
                    />
                    <DataCard
                        title="Altura"
                        value={height}
                        unit="cm"
                    />
                    <DataCard
                        title="Edad"
                        value={age}
                        unit="años"
                    />
                    <DataCard
                        title="Género"
                        value={sex}
                    />
                </div>

            </div>
        </section>
    )
}
