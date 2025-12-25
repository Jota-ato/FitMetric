import type { ReactNode } from 'react'

export default function CenterContainer({ children }: { children: ReactNode }) {
    return (
        <section className="flex justify-center items-center h-screen w-screen">
            {children}
        </section>
    )
}
