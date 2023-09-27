import {useState, useEffect} from "react";
import {useForm, FieldValues} from "react-hook-form";
//ui
import {useToast} from "../../@/components/ui/use-toast.ts";
import InputCustom from "../ui/inputForm/InputCustom.tsx";
import {Button} from "../../@/components/ui/button.tsx";
import SelectCustom from "../ui/inputForm/SelectCustom.tsx";
import {SelectItem} from "../../@/components/ui/select.tsx";
//services
import {userServices} from "../../services/userServices.ts";
import {getUser} from "../../utils/userGetter.ts";
//data
import {poles} from "../../utils/data.ts";
//icon
import {KeyRound} from "lucide-react";

type Props = {
    defaultValues? : Form
    status? : string
    idEmployee? : string
    closeDialog : () => void
    fetchData: () => void
}

type Form = {
    lastname : string
    firstname: string
    email: string
    password: string
    pole: string
    role: number
}
const AddUserForm = (props: Props) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const charSpe = "@&!./"
    const { toast } = useToast()
    const user = getUser()
    const [requiredFields] = useState(props.status === "update" ? false : true)
    const {register, formState: {errors: {lastname, firstname, email, password}}, handleSubmit, setValue, watch} = useForm()

    useEffect(() => {
        if (props.defaultValues) {
            const values = props.defaultValues
            setValue("firstname", values?.firstname)
            setValue("lastname", values?.lastname)
            setValue("email", values?.email)
            setValue("role", values?.role.toString())
            setValue("pole", values?.pole)
        }
    }, [])

    const generatePassword = () => {
        let password = ""
        while (password.length <= 12) {
            const random = Math.floor(Math.random() * 3)
            switch (random) {
                case 0 :
                    password = password + charSpe.charAt(Math.floor(Math.random() * charSpe.length))
                    break
                case 1 :
                    password = password + alphabet.charAt(Math.floor(Math.random() * alphabet.length))
                    break
                case 2 :
                    password = password + alphabet.charAt(Math.floor(Math.random() * alphabet.length)).toUpperCase()
                    break
            }
        }
        console.log(password)
        setValue("password", password)
    }
    const onSubmit = (values : FieldValues) => {
        if (props.status === "update" && props.idEmployee) {
            console.log("prout")
            const updatedUser = {
                firstname : values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
                pole: values.pole,
                role: parseInt(values.role)
            }
            userServices.updateUserById(updatedUser, props.idEmployee, user._id)
            toast({title : "Modification", description : "Modification des informations de l'utilisateur réussi."})
        } else {
            const newUser = {
                firstname : values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
                pole: values.pole,
                role: parseInt(values.role)
            }
            userServices.addUser(newUser, user._id)
            toast({title: "Ajout", description: "Ajout de l'utilisateur réussi."})
        }
        props.closeDialog()
        props.fetchData()
    }

    const handleErrors = (err : FieldValues) => {
        console.log(err)
    }
    return (
        <div id="form-container">
            <form onSubmit={handleSubmit(onSubmit, handleErrors)} className={"flex flex-col items-center gap-y-2"}>
                <div className={"flex gap-4"}>
                    <InputCustom
                        id={"lastname"}
                        register={register}
                        name={"lastname"}
                        error={lastname}
                        required={requiredFields}
                        label="Nom *"
                        onChange={(e) => setValue("lastname", e.target.value.toUpperCase())}
                    />

                    <InputCustom
                        id={"firstname"}
                        name={"firstname"}
                        register={register}
                        error={firstname}
                        required={requiredFields}
                        label={"Prénom *"}
                        onChange={(e) => setValue("firstname", e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                    />
                </div>
                <div className={"flex gap-4"}>
                    <InputCustom
                        id={"email"}
                        register={register}
                        name={"email"}
                        error={email}
                        patternMessage={"Email incorrect"}
                        typeInput={"email"}
                        required={requiredFields}
                        label="Email *"
                    />

                    <div className={"flex items-end gap-1 w-1/2 px-1"}>
                        <div>
                            <InputCustom
                                id={"password"}
                                name={"password"}
                                type={"password"}
                                register={register}
                                error={password}
                                required={requiredFields}
                                label={"Mot de passe"}
                            />
                        </div>

                        <Button type={"button"} onClick={() => generatePassword()}>
                            <KeyRound/>
                        </Button>
                    </div>

                </div>

                <div className={"flex gap-4 w-full px-1.5"}>
                    <SelectCustom
                        required={requiredFields}
                        label={"Pole"}
                        id={"pole"}
                        register={register}
                        name={"pole"}
                        onChange={(value) => setValue("pole", value)}
                        render={poles.map((pole) => (
                            <SelectItem value={pole.name}>{pole.name}</SelectItem>
                        ))}
                        value={watch("pole")}
                    />

                    <SelectCustom
                        required={requiredFields}
                        label={"Role"}
                        id={"role"}
                        register={register}
                        name={"role"}
                        onChange={(value) => setValue("role", value)}
                        render={[<>
                            <SelectItem value={"0"}>Administrateur</SelectItem>
                            <SelectItem value={"1"}>Directeur</SelectItem>
                            <SelectItem value={"2"}>Référent</SelectItem>
                            <SelectItem value={"3"}>L'employé</SelectItem>
                        </>
                        ]}
                        value={watch("role")}
                    />
                </div>


                <Button type={"submit"} variant={"outline"}>Valider</Button>
            </form>
        </div>
    )
}

export default AddUserForm