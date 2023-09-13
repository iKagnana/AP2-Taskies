//shadcn-ui
import {Button} from "../../@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../../@/components/ui/dropdown-menu.tsx";

import {
    User,
    Boxes,
    KeyRound,
    LogOut,
    ChevronDown,
    StickyNote,
    UserSquare,
} from "lucide-react";

//service
import {getUser} from "../../utils/userGetter.ts";


const Header = () => {
    const pole = localStorage.getItem("pole")
    const user = getUser()
    return (
        <div id={"container"} className={"w-full h-44 flex justify-around items-center text-lg bg-[#f1f5f9]"}>
            <span>{user.lastname + " " + user.firstname} | GSB - Taskies </span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"}>
                        <span className={"text-lg"}>{pole}</span>
                        <ChevronDown className={"ml-2 h-4 w-4"}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <User className={"mr-2 h-4 w-4"}/>
                        <span className={"text-lg"}>Utilisateurs</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Boxes className={"mr-2 h-4 w-4"}/>
                        <span className={"text-lg"}>Pôles</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <KeyRound className={"mr-2 h-4 w-4"}/>
                        <span className={"text-lg"}>Autorisations</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <StickyNote className={"mr-2 h-4 w-4"}/>
                        <span className={"text-lg"}>Mes notes perso</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UserSquare className={"mr-2 h-4 w-4"}/>
                        <span className={"text-lg"}>Mon compte</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <LogOut className={"mr-2 h-4 w-4"}/>
                        <span className={"text-lg"}>Déconnexion</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Header