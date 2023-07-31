import React, {createContext, useState, Dispatch} from "react";

export type InitialStateType = {
    pole: string,
}

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<React.SetStateAction<InitialStateType>>;
}>({
    state: {pole: ""},
    dispatch: () => null
})

type Props = {
    children: React.ReactNode
}

const AppProvider = ({children} : Props) => {
    const [state, dispatch] = useState<InitialStateType>({pole : ""})
    return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>
}

export {AppProvider, AppContext}