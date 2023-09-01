import {useEffect, useState} from "react";
//components
import Header from "../../components/header/Header.tsx";
import AddUserForm from "../../components/form/AddUserForm.tsx";
//shadcn
import {Button} from "../../@/components/ui/button.tsx";
import {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableCaption,
    TableRow,
    TableHead
} from "../../@/components/ui/table.tsx";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../@/components/ui/dialog.tsx";
//services
import {userServices} from "../../services/userServices.ts";
//type
import {User} from "../../utils/type.ts";
const UsersPage = () => {
    const [users, setUsers] = useState<[User]>()

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await userServices.getUsers()
        setUsers(response)
    }
    return (
        <div id={"container"}>
            <Header/>
            <div id={"button-container"} className={"p-5 flex justify-end"}>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button >Création d'utilisateur</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Création d'un nouvel utilisateur</DialogTitle>
                            <AddUserForm/>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
            <div id={"table-container"} className={"px-36"}>
                <Table>
                    <TableCaption>Listes de tous les utilisateurs de gsb</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Pole</TableHead>
                            <TableHead>Nombres de tâches assignées</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className={"text-left"}>{user["lastname"]}</TableCell>
                                <TableCell className={"text-left"}>{user["firstname"]}</TableCell>
                                <TableCell className={"text-left"}>{user["email"]}</TableCell>
                                <TableCell className={"text-left"}>{user["pole"] === "all" ? "administrateur" : user["pole"]}</TableCell>
                                <TableCell className={"text-left"}>{user["tasks"].length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default UsersPage