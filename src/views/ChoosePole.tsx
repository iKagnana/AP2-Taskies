import PoleCard from "../components/ui/card/PoleCard.tsx";

const ChoosePole = () => {
    return (
        <div className={"flex flex-col justify-center h-screen"}>
            <h1 className={"mb-5 text-xl"}>Choisissez votre pôle</h1>
            <div id="card-container" className={"flex justify-evenly flex-wrap"}>
                <PoleCard title={"Réseau & systèmes"} image={"https://cdn.pixabay.com/photo/2016/08/05/16/51/network-1572617_1280.jpg"}/>
                <PoleCard title={"Administration"} image={"https://cdn.pixabay.com/photo/2018/11/15/09/15/documents-3816835_1280.jpg"}/>
                <PoleCard title={"Communication et rédaction"} image={"https://cdn.pixabay.com/photo/2015/01/08/18/26/man-593333_1280.jpg"}/>
                <PoleCard title={"Développement"} image={"https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_1280.jpg"}/>
                <PoleCard title={"Commercial"} image={"https://cdn.pixabay.com/photo/2016/03/05/21/21/agree-1238964_1280.jpg"}/>
                <PoleCard title={"Labo-recherche"} image={"https://cdn.pixabay.com/photo/2017/02/01/13/53/analysis-2030265_1280.jpg"}/>
            </div>
        </div>
    )
}

export default ChoosePole