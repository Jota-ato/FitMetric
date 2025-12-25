export default function RegistationForm() {

    return (
        <section className="flex justify-center items-center h-screen w-screen">
            <form className="bg-surface p-8 rounded-xl">
                <fieldset className="space-y-4">
                    <legend className="text-4xl font-bold">Información Personal</legend>

                    <div className="space-y-4">
                        <label htmlFor="name" className="block text-2xl font-semibold">Nombre</label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Nombre"
                            className="text-2xl block border-b border-text-main focus:outline-none bg-transparent w-full"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="age" className="block text-2xl font-semibold">Edad</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="Edad (años)"
                            className="text-2xl block border-b border-text-main focus:outline-none bg-transparent w-full"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="weight" className="block text-2xl font-semibold">Peso</label>
                        <input
                            id="weight"
                            name="weight"
                            type="number"
                            placeholder="Peso (kg)"
                            className="text-2xl block border-b border-text-main focus:outline-none bg-transparent w-full"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="height" className="block text-2xl font-semibold">Altura</label>
                        <input
                            id="height"
                            name="height"
                            type="number"
                            placeholder="Altura (cm)"
                            className="text-2xl block border-b border-text-main focus:outline-none bg-transparent w-full"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="gender" className="block text-2xl font-semibold">Género</label>
                        <select
                            id="gender"
                            name="gender"
                            className="text-2xl block border-b border-text-main focus:outline-none bg-transparent w-full focus:bg-bg"
                        >
                            <option value="Male">Masculino</option>
                            <option value="Female">Femenino</option>
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
