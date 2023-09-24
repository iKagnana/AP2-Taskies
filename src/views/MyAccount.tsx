import Header from "../components/header/Header.tsx";
import UserInfo from "../components/Account/UserInfo.tsx";
import StatisticTask from "../components/Account/StatisticTask.tsx";
//service
import {getUser} from "../utils/userGetter.ts";
const MyAccount = () => {
    const user = getUser()

    return (
        <div id={"page-container"} className={"flex flex-col items-center min-h-screen gap-2"}>
            <Header/>
            <div className={"flex h-full p-10 gap-2 w-2/3"}>
                <UserInfo/>
                <StatisticTask user={user} />
            </div>

        </div>
    )
}

export default MyAccount