// component
import Header from "../../components/header/Header.tsx";
import DragAndDropTask from "../../components/User/DragAndDropTask.tsx";

const HomePageUser = () => {
    return (
        <div id={"page-container"} className={"flex flex-col items-center h-screen gap-2"}>
            <Header/>
            <DragAndDropTask/>
        </div>
    )
}

export default HomePageUser