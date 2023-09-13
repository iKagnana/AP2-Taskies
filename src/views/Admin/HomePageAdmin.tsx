import {useNavigate} from "react-router-dom";
import GestionCard from "../../components/ui/card/GestionCard.tsx";
import Header from "../../components/header/Header.tsx";
//service
import {getUser} from "../../utils/userGetter.ts";
//icon
import {
    User,
    Boxes,
    KeyRound,
    StickyNote,
    UserSquare,
    Beaker
} from "lucide-react";

const HomePageAdmin = () => {
    const user = getUser()
    const navigate = useNavigate()
    return (
        <div id={"container"} className={"flex flex-col items-center h-screen"}>
            <Header/>
            <div id={"page-container"} className={"flex w-full h-full"}>
                <div className={"p-24 w-2/5 bg-[#91ADCA]"}>
                    <span className={"text-3xl"}>Bienvenu(e) dans votre espace personnel {user?.firstname} !</span>
                </div>
                <div id={"right-side"} className={"flex flex-col items-center w-3/5 p-2"}>
                    <span className={"text-2xl"}>Gestion</span>
                    <div id={"card-container"} className={"flex justify-center items-center flex-wrap"}>
                        <div className={"flex justify-center"}>
                            <GestionCard onClick={() => navigate("/admin/utilisateurs")} title={"Utilisateurs"} icon={User}/>
                            <GestionCard onClick={() => navigate("/admin/utilsateurs")} title={"Pôles"} icon={Boxes}/>
                            <GestionCard onClick={() => navigate("/admin/utilsateurs")} title={"Autorisations"} icon={KeyRound}/>
                        </div>
                        <div className={"flex justify-center"}>
                            <GestionCard onClick={() => navigate("/admin/utilsateurs")} title={"Mes notes personnelles"} icon={StickyNote}/>
                            <GestionCard onClick={() => navigate("/admin/utilsateurs")} title={"Mon compte"} icon={UserSquare}/>
                            <GestionCard onClick={() => navigate("/admin/utilsateurs")} title={"À propos de GSB"} icon={Beaker}/>
                        </div>


                    </div>
                </div>

            </div>


        </div>
    )
}

export default HomePageAdmin