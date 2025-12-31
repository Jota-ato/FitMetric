
import type { ReactNode } from "react"

export default function FormContainer({ children }: { children: ReactNode }) {
    return (
        <div className="bg-surface my-8 p-16 rounded-xl w-[90%] max-w-440 mx-auto shadow-card">
            {children}
        </div>
    )
}
