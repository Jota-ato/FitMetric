import type { ReactNode } from 'react'

export default function Modal({ children }: { children: ReactNode }) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-surface/40 z-50 flex justify-center items-center">
            {children}
        </div>
    )
}
