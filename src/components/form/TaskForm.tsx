import {useEffect, useState} from "react";
import { useForm, FieldValues } from "react-hook-form";
//ui
import {useToast} from "../../@/components/ui/use-toast.ts";
import InputCustom from "../ui/inputForm/InputCustom.tsx";
import {Button} from "../../@/components/ui/button.tsx";
import {Badge} from "../../@/components/ui/badge.tsx";
import SelectCustom from "../ui/inputForm/SelectCustom.tsx";
import {SelectItem} from "../../@/components/ui/select.tsx";
import Combobox from "../ui/ComboBox.tsx";
import {CommandItem} from "../../@/components/ui/command.tsx";
import {Check} from "lucide-react";
import {cn} from "../../@/lib/utils.ts";
//service
import {userServices} from "../../services/userServices.ts";
//type
import {User} from "../../utils/type.ts";
import {poles} from "../../utils/data.ts";
import {tasksService} from "../../services/taskServices.ts";

type Props = {
    defaultValues? : Form
    status? : string
    user?: User
    index: number
    closeDialog : () => void
    fetchData: () => void
    id?: string
}

type Form = {
    assignee: string
    pole: string
    title: string
    desc?: string
    status: string
    comment?: string

}

const TaskForm = (props: Props) => {
    const [users, setUsers] = useState<User[]>([])
    const [openCombo, setOpenCombo] = useState<boolean>(false)
    const [disabledField, setDisabledField] = useState<string[]>([])
    const {toast} = useToast()
    const {register, formState: {errors: { assignee, pole, title}}, handleSubmit, setValue, watch} = useForm()

    useEffect(() => {
        fetchData()
        if (props.status  === "add") {
            setValue("status", "À faire")
            // pole de l'utilisateur pour création de tâches
            // on ne compte pas le rôle administrateur ni directeur
            switch (props.user?.role) {
                case 2 :
                    setValue("pole", props.user.pole)
                    setDisabledField(["pole"])
                    break
                case 3 :
                    setValue("assignee", props.user.firstname + " " + props.user.lastname)
                    setValue("pole", props.user.pole)
                    setDisabledField(["assignee", "pole"])
            }
        } else {
            if (props.defaultValues) {
                const values = props.defaultValues
                setValue("assignee", values.assignee)
                setValue("pole", values.pole)
                setValue("title", values.title)
                setValue("status", values.status)
                setValue("desc", values.desc)
                setValue("comment", values.comment)
            }

        }
    }, [])

    const fetchData = async () => {
        const response = await userServices.getUsers()
        setUsers(response)
    }

    const onSubmit = (values: FieldValues) => {
        if (props.status === "add") {
            const newTask = {
                index: props.index,
                assignee: values.assignee,
                pole: values.pole,
                title: values.title,
                desc: values.desc,
                status: "À faire",
                comment: values.comment,
            }

            tasksService.addTasks(newTask)
            toast({title: "Ajout", description : "Ajout de la tâche réussie"})
        } else if (props.status === "update" && props.id) {
            const newTask = {
                index: props.index,
                assignee: values.assignee,
                pole: values.pole,
                title: values.title,
                desc: values.desc,
                status: values.status,
                comment: values.comment,
            }

            tasksService.updateTaskById(props.id, newTask)
            toast({title: "Modification", description : "Modification de la tâche réussie"})
        }

    }

    const handleErrors = (err : FieldValues) => {
        console.log(err)
        if (err) {
            toast({title : "Erreur dans la saisie du formulaire", description : "Vérifier bien que toutes les informations soient conformes"})
        }
    }
    return (
        <div id={"form-container"}>
            <form onSubmit={handleSubmit(onSubmit, handleErrors)} className={"flex flex-col gap-2"}>
                <div className={"flex pb-1"}>
                    <Combobox
                        disabled={disabledField.includes("assignee")}
                        value={watch("assignee")}
                        open={openCombo}
                        setOpen={(open) => setOpenCombo(open)}
                        render={users.map((user, index) => (
                            <CommandItem
                                key={index}
                                onSelect={(currentValue) => {
                                    setValue("assignee", currentValue)

                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        watch("assignee") === user.firstname + " " + user.lastname ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1) + " " + user.lastname.toUpperCase()}
                            </CommandItem>
                            ))}
                        placeholder={"Employé(e)"}
                        register={register}
                        label={"Assigner à "}
                        name={"assignee"}
                        required={true}
                        error={assignee}
                    />

                    <SelectCustom
                        disabled={disabledField.includes("pole")}
                        label={"Pole"}
                        id={"pole"}
                        register={register}
                        name={"pole"}
                        onChange={(value) => setValue("pole", value)}
                        render={poles.map((pole) => (
                            <SelectItem value={pole.name}>{pole.name}</SelectItem>
                        ))}
                        value={watch("pole")}
                        required={true}
                        error={pole}
                    />
                </div>
                <Badge className={"w-16"}>{watch("status")}</Badge>
                <InputCustom register={register} name={"title"} label={"Titre"} id={"title"} required={true} error={title}/>

                <InputCustom register={register} name={"desc"} label={"Description"} id={"desc"}/>
                <InputCustom register={register} name={"comment"} label={"Commentaire"} id={"comment"}/>

                <Button type={"submit"} className={"mt-3"}>Valider</Button>
            </form>
        </div>
    )
}

export default TaskForm