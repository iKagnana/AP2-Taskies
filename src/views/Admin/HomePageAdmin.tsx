import {useContext} from "react";
import {AppContext} from "../../utils/context.tsx";
import GestionCard from "../../components/ui/card/GestionCard.tsx";
import Header from "../../components/header/Header.tsx";

import {
    User,
    Boxes,
    KeyRound,
    StickyNote,
    UserSquare,
    Beaker
} from "lucide-react";

const HomePageAdmin = () => {
    const {state} = useContext(AppContext)
    return (
        <div id={"container"} className={"flex flex-col items-center h-screen"}>
            <Header/>
            <div id={"page-container"} className={"flex w-full h-full"}>
                <div className={"p-24 w-2/5 bg-[#91ADCA]"}>
                    <span className={"text-3xl"}>Bienvenu(e) dans votre espace personnel {state.user?.firstname} !</span>
                </div>
                <div id={"right-side"} className={"flex flex-col items-center w-3/5 p-2"}>
                    <span className={"text-2xl"}>Gestion</span>
                    <div id={"card-container"} className={"flex justify-center items-center flex-wrap"}>
                        <div className={"flex justify-center"}>
                            <GestionCard title={"Utilisateurs"} icon={User}/>
                            <GestionCard title={"Pôles"} icon={Boxes}/>
                            <GestionCard title={"Autorisations"} icon={KeyRound}/>
                        </div>
                        <div className={"flex justify-center"}>
                            <GestionCard title={"Mes notes personnelles"} icon={StickyNote}/>
                            <GestionCard title={"Mon compte"} icon={UserSquare}/>
                            <GestionCard title={"À propos de GSB"} icon={Beaker}/>
                        </div>


                    </div>
                </div>

            </div>


        </div>
    )
}

export default HomePageAdmin