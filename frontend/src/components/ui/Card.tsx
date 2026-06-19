import { ReactNode } from "react"

export const Card = ({ children }: {children: ReactNode}) => {
    return(
        <div className="bg-white rounded-xl p-10 shadow-lg w-2xl">
            {children}
        </div>
    )
}