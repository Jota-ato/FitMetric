import { useEffect, type ReactNode } from 'react'

export default function Modal({ children }: { children: ReactNode }) {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div id='modal' className="fixed top-0 left-0 right-0 bottom-0 bg-surface/40 z-50 flex justify-center items-center">
            {children}
        </div>
    )
}
