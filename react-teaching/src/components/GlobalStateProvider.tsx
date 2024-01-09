import React, { createContext, useContext, useState } from 'react'

const data = {
    variable: localStorage.getItem("variable"),
    variable1: localStorage.getItem("variable1"),
    variable2: localStorage.getItem("variable2"),
    variable3: localStorage.getItem("variable3"),
    conditional: localStorage.getItem("conditional"),
    conditional1: localStorage.getItem("conditional1"),
    conditional2: localStorage.getItem("conditional2"),
    conditional3: localStorage.getItem("conditional3"),
    loop: localStorage.getItem("loop"),
    loop1: localStorage.getItem("loop1"),
    loop2: localStorage.getItem("loop2"),
    loop3: localStorage.getItem("loop3"),
}
const CompleteData = createContext(data)
const UpdateData = createContext<any>(undefined)
function GlobalStateProvider({ children }: { children: any }) {
    const [completeDataState, setCompleteDataState] = useState(data)
    const updateDataMethod = (key: string, value: string) => {
        setCompleteDataState(prev => ({ ...prev, [key]: value }))
    }
    return (
        <CompleteData.Provider value={completeDataState}>
            <UpdateData.Provider value={updateDataMethod}>
                {children}
            </UpdateData.Provider>
        </CompleteData.Provider>
    )
}
const useGlobalData = () => [useContext(CompleteData), useContext(UpdateData)]

export { GlobalStateProvider, useGlobalData } 