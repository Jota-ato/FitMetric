import { usePatientStore } from "../../stores/PatientStore"
import { Outlet, useNavigate } from "react-router"
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
    const caloriesNeeded = usePatientStore(state => state.caloriesNeeded)
    const goal = usePatientStore(state => state.goal)
    const purpose = usePatientStore(state => state.purpose)
    const navigate = useNavigate()

    return (
        <section className="w-[90%] max-w-440 mx-auto">
            <h1 className="my-8 text-center text-6xl font-bold">Perfil ({name})</h1>
            <div className="text-text-main bg-surface p-8 rounded-xl shadow-card">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    <DataCard
                        title="Objetivo"
                        value={goal}
                    />
                    <CaloriesCard
                        name="Calorías necesarias con base en tu objetivo"
                        calories={caloriesNeeded}
                    />
                    <DataCard
                        title="Propósito"
                        value={purpose}
                        tailwindStyles="row-start-5 col-start-2 md:row-auto md:col-auto"
                    />


                </div> {/* End of the grid*/}
            </div> {/* End of the card*/}
            <div className="text-text-main bg-surface p-8 rounded-xl shadow-card my-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold">Editar perfil</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('edit-basic-info')}
                        className="bg-primary hover:bg-primary-hover hover:scale-105 text-text-main px-8 py-4 rounded-xl text-xl font-black cursor-pointer transition-all duration-300"
                    >Editar Información Básica</button>
                    <button
                        onClick={() => navigate('edit-detail-info')}
                        className="bg-secondary hover:bg-secondary-hover hover:scale-105 text-text-main px-8 py-4 rounded-xl text-xl font-black cursor-pointer transition-all duration-300"
                    >Editar Información Detallada</button>
                </div>
            </div>
            <div >
                <Outlet />
            </div>
        </section>
    )
}
