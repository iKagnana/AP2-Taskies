import {Navigate, useLocation} from "react-router-dom";
import {getUser} from "../../utils/userGetter.ts";

type Props = {
    children: JSX.Element
}
export const ProtectedRoute = ({children}: Props)  => {
    const user = getUser()
    const location = useLocation()
    console.log(user)
    console.log(location)
    if (!user) {
        return <Navigate to={"/connexion"}/>
    } else {
        if (user.role !== 0 && location.pathname.includes("/admin")) {
            return <Navigate to={"/connexion"}/>
        }

    }

    return children
}