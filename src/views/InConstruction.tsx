import {useNavigate} from "react-router-dom";
//component
import Header from "../components/header/Header.tsx";
//ui
import {Button} from "../@/components/ui/button.tsx";
const InConstruction = () => {
    const navigate = useNavigate()

    return (
        <div id={"page-container"} className={"flex flex-col h-screen"}>
            <Header/>
            <div id={"content-container"} className={"flex flex-col justify-center items-center h-full"}>
                <span className={"text-3xl"}>Cette fonctionnalité arrive bientôt !</span>
                <img src={"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0679d262-9388-490a-9365-09537b02b71d/d1kpdma-97d730d4-ea9c-4aec-aff9-fb14e9719ac3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA2NzlkMjYyLTkzODgtNDkwYS05MzY1LTA5NTM3YjAyYjcxZFwvZDFrcGRtYS05N2Q3MzBkNC1lYTljLTRhZWMtYWZmOS1mYjE0ZTk3MTlhYzMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0P3drz9NW0VQX_5Eb-fiikcrAVD4vwH9FJY81GE__3Q"}/>

                <Button className={"rounded"} onClick={() => navigate(-1)}>Retour</Button>
            </div>
        </div>
    )
}

export default InConstruction

