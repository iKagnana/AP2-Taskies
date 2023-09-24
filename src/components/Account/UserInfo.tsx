import {useNavigate} from "react-router-dom";
//ui
import {Button} from "../../@/components/ui/button.tsx";
//icon
import {UserSquare2} from "lucide-react";
//service
import {getUser} from "../../utils/userGetter.ts";
const UserInfo = () => {
    const navigate = useNavigate()
    const user = getUser()

    return (
        <div id={"componenent-container"} className={"flex flex-col justify-between border rounded border-black p-5"}>
            <div className={"flex flex-col items-center"}>
                <UserSquare2 className={"w-32 h-32"}/>
                <span>{user.lastname} {user.firstname}</span>
                <span>{user.email}</span>
            </div>
            <Button onClick={() => navigate("/reset-password/token")} variant={"ghost"} className={"text-blue-500"}>Je veux modifier mon mot de passe</Button>
        </div>
    )
}

export default UserInfo