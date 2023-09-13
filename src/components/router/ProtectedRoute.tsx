import {Navigate} from "react-router-dom";
import {getUser} from "../../utils/userGetter.ts";

export const ProtectedRoute = ({children})  => {
    const user = getUser()
    console.log(user)
    if (!user) {
        return <Navigate to={"/connexion"}/>
    }

    return children
}