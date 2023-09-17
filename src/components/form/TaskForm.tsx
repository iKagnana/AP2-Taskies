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
import TextareaCustom from "../ui/inputForm/TextareaCustom.tsx";
//service
import {userServices} from "../../services/userServices.ts";
import {tasksService} from "../../services/taskServices.ts";
import {getUser} from "../../utils/userGetter.ts";
//type
import {User} from "../../utils/type.ts";
import {poles} from "../../utils/data.ts";
import {Input} from "../../@/components/ui/input.tsx";
import {Label} from "../../@/components/ui/label.tsx";

type Props = {
    defaultValues? : Form
    status? : string
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
    files?: string[]
}

const TaskForm = (props: Props) => {
    const [users, setUsers] = useState<User[]>([])
    const [openCombo, setOpenCombo] = useState<boolean>(false)
    const [disabledField, setDisabledField] = useState<string[]>([])
    const [files, setFiles] = useState<string[]>(props.defaultValues?.files || [])
    const [addedFile, setAddedFile] = useState<string>("")
    const {toast} = useToast()
    const {register, formState: {errors: { assignee, pole, title}}, handleSubmit, setValue, watch} = useForm()

    const actualUser = getUser()

    useEffect(() => {
        fetchData()

        // pole de l'utilisateur pour création de tâches
        // on ne compte pas le rôle administrateur ni directeur
        switch (actualUser.role) {
            case 2 :
                setValue("pole", actualUser.pole)
                setDisabledField(["pole"])
                break
            case 3 :
                setValue("assignee", actualUser.firstname + " " + actualUser.lastname)
                setValue("pole", actualUser.pole)
                setDisabledField(["assignee", "pole"])
        }
        if (props.status  === "add") {
            setValue("status", "todo")
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

    const getText = (status: string) => {
        switch (status) {
            case "todo" :
                return "À faire"
            case "inProgress":
                return "En cours"
            case "complete":
                return "Terminée"
        }
    }

    const addFile = () => {
        setFiles([...files, addedFile])
        setAddedFile("")
    }

    const onSubmit = (values: FieldValues) => {
        if (props.status === "add") {
            const newTask = {
                index: props.index,
                assignee: values.assignee,
                pole: values.pole,
                title: values.title,
                desc: values.desc,
                status: "todo",
                comment: values.comment,
                files: files
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
                files: files
            }

            tasksService.updateTaskById(props.id, newTask)
            toast({title: "Modification", description : "Modification de la tâche réussie"})
        }

        props.closeDialog()
        props.fetchData()

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
                        label={"Assigner à *"}
                        name={"assignee"}
                        required={true}
                        error={assignee}
                    />

                    <SelectCustom
                        disabled={disabledField.includes("pole")}
                        label={"Pole *"}
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
                <Badge className={"w-16"}>{getText(watch("status"))}</Badge>
                <InputCustom register={register} name={"title"} label={"Titre *"} id={"title"} required={true} error={title}/>

                <TextareaCustom register={register} name={"desc"} label={"Description"} id={"desc"}/>
                <TextareaCustom register={register} name={"comment"} label={"Commentaire"} id={"comment"}/>

                <div>
                    <Label>Fichier(s)</Label>
                    <div className={"flex gap-2 mt-2 mb-2"}>
                        <Button type="button" onClick={() => addFile()}>Ajouter un lien</Button>
                        <Input value={addedFile} onChange={(e) => setAddedFile(e.target.value)}/>
                    </div>

                    {files.length !== 0 ? (
                        <Label className={"text-gray-500"}>Listes de fichiers</Label>
                    ) : null}
                    {files.map((file) => (
                        <li>{file}</li>
                    ))}
                </div>

                <Button type={"submit"} className={"mt-3"}>Valider</Button>
            </form>
        </div>
    )
}

export default TaskForm