
//component
import TaskByPole from "../stats/TaskByPole.tsx";
import TaskByUser from "../stats/TaskByUser.tsx";
//type
import {User} from "../../utils/type.ts";

type Props = {
    user: User
}

const StatisticTask = (props: Props) => {
    return (
        <div id={"component-container"} className={"flex flex-col border border-black rounded w-full items-center p-5"}>
            <span>Vos tâches :</span>
            <div className={"w-80"}>
                <TaskByUser assignee={props.user.firstname + " " + props.user.lastname}/>

            </div>

            <span>Les tâches de votre pôle : </span>
            <div className={"w-80"}>
                <TaskByPole pole={props.user.pole}/>
            </div>

        </div>
    )
}

export default StatisticTask