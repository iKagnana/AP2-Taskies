import {useEffect, useState} from "react";
//components
import Header from "../../components/header/Header.tsx";
import AddUserForm from "../../components/form/AddUserForm.tsx";
//shadcn
import {Toaster} from "../../@/components/ui/toaster.tsx";
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
import {useToast} from "../../@/components/ui/use-toast.ts";
//icon
import {Trash2, Pen, RefreshCw} from "lucide-react";
//services
import {userServices} from "../../services/userServices.ts";
import {getUser} from "../../utils/userGetter.ts";
//type
import {User} from "../../utils/type.ts";
const UsersPage = () => {
    const [openAdd, setOpenAdd] = useState<boolean>(false)
    const [openUpdate, setOpenUpdate] = useState<boolean>(false)
    const [users, setUsers] = useState<[User]>()
    const { toast } = useToast()
    const user = getUser()

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await userServices.getUsers()
        setUsers(response)
    }

    const getRole = (role : number) => {
        switch (role) {
            case 0 :
                return "Administrateur"
            case 1 :
                return "Directeur"
            case 2 :
                return "Référent"
            case 3 :
                return "Employé"
        }
    }

    const deleteUser = (id?: string) => {
        if (id) {
            userServices.deleteUserById(id, user._id)
            toast({
                title: "Suppression",
                description : "L'utilisateur a bien été supprimé."
            })
        }
        fetchData()
    }
    return (
        <div id={"container"}>
            <Header/>
            <div id={"button-container"} className={"p-5 flex justify-end gap-2"}>
                <Button onClick={()=> fetchData()}><RefreshCw color="#ffffff" /></Button>
                <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpenAdd(true)} >Création d'utilisateur</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Création d'un nouvel utilisateur</DialogTitle>
                            <AddUserForm fetchData={fetchData} closeDialog={() => setOpenAdd(false)}/>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
            <div id={"table-container"} className={"px-36"}>
                <Table>
                    <TableCaption>Listes de tous les utilisateurs de gsb</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Pole</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Nombres de tâches assignées</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <Button variant={"ghost"} onClick={() => deleteUser(user._id)}><Trash2/></Button>
                                    <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
                                        <DialogTrigger asChild>
                                            <Button onClick={() => setOpenUpdate(true)} variant={"ghost"}><Pen/></Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Modification de l'utilisateur</DialogTitle>
                                            </DialogHeader>
                                            <AddUserForm
                                                defaultValues={user}
                                                status={"update"}
                                                idEmployee={user._id}
                                                fetchData={fetchData}
                                                closeDialog={() => setOpenUpdate(false)}
                                            />
                                        </DialogContent>
                                    </Dialog>

                                </TableCell>
                                <TableCell className={"text-left"}>{user["lastname"]}</TableCell>
                                <TableCell className={"text-left"}>{user["firstname"]}</TableCell>
                                <TableCell className={"text-left"}>{user["email"]}</TableCell>
                                <TableCell className={"text-left"}>{user["pole"] === "all" ? "administrateur" : user["pole"]}</TableCell>
                                <TableCell className={"text-left"}>{getRole(user["role"])}</TableCell>
                                <TableCell className={"text-left"}>{user["tasks"].length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Toaster/>
        </div>
    )
}

export default UsersPage