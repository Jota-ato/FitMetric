
import type { ReactNode } from "react"

export default function FormContainer({ children }: { children: ReactNode }) {
    return (
        <div className="bg-surface p-16 rounded-xl w-[90%] max-w-400 shadow-card">
            {children}
        </div>
    )
}
