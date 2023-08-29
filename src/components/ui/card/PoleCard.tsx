import {Link} from "react-router-dom";

type Props = {
    title: string
    image: string
    setPole: (pole: string) => void
}

const PoleCard = (props: Props) => {
    return (
        <div id="container">
            <Link to={"/connexion"} className={"flex flex-col items-center"} onClick={() => props.setPole(props.title)}>
            <img className={"object-cover h-32 w-32"}
                 src={props.image}/>
            <span>{props.title}</span>
            </Link>
        </div>
    )
}

export default PoleCard