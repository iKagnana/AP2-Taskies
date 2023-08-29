import { useContext} from "react";
import {AppContext} from "../utils/context.tsx";
import PoleCard from "../components/ui/card/PoleCard.tsx";

//data
import {poles} from "../utils/data.ts";

const ChoosePole = () => {
    const {state, dispatch} = useContext(AppContext)

    const setPole = (pole: string) => {
        console.log("click")
        console.log("pole", pole)
        console.log({...state, pole: pole})
        dispatch({...state, pole : pole})
    }

    return (
        <div className={"flex flex-col justify-center h-screen"}>
            <h1 className={"mb-5 text-xl"}>Choisissez votre pôle</h1>
            <div id="card-container" className={"flex justify-evenly flex-wrap"}>
                {poles.map((pole, index) => (
                    <PoleCard key={index} title={pole.name} image={pole.img} setPole={setPole}/>
                ))}
            </div>
        </div>
    )
}

export default ChoosePole