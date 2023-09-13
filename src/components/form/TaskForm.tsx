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

type Props = {
    defaultValues? : Form
    status? : string
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
    const {toast} = useToast()
    const {register, formState: {errors: { assignee, pole, title}}, handleSubmit, setValue, watch} = useForm()

    useEffect(() => {
        fetchData()
        if (props.status  === "add") {
            setValue("status", "À faire")
        }
    }, [])

    const fetchData = async () => {
        const response = await userServices.getUsers()
        setUsers(response)
    }

    const onSubmit = (values: FieldValues) => {
        console.log(values)
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