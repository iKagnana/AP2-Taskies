import {LucideIcon} from "lucide-react";

type Props = {
    title: string
    icon: LucideIcon
    onClick: () => void
}

const GestionCard = (props: Props) => {
    return (
        <div onClick={props.onClick}  id="container" className={"w-32 h-32 2xl:w-48 2xl:h-48 border rounded-md m-24 hover:shadow-md"}>
            <div className={"flex flex-col items-center justify-center h-full"}>
                <props.icon size={48}/>
                {props.title}
            </div>
        </div>
    )
}

export default GestionCard