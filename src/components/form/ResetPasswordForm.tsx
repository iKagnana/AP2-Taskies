import {useState} from "react";
import {useForm, FieldValues} from "react-hook-form";
//ui
import {useToast} from "../../@/components/ui/use-toast.ts";
import InputCustom from "../ui/inputForm/InputCustom.tsx";
import {Button} from "../../@/components/ui/button.tsx";
//service
import {userServices} from "../../services/userServices.ts";

type Props = {
    email : string
}

const ResetPasswordForm = (props: Props) => {
    const [inputError, setInputError] = useState("")
    const {register, formState: {errors: {password, passwordCheck}}, handleSubmit} = useForm()
    const {toast} = useToast()


    const onSubmit = async (values : FieldValues) => {
        if (values.password !== values.passwordCheck) {
            setInputError("Les deux mots de passe sont différents.")
            toast({title: "Erreur mot de passe", description : "Les deux mots de passe sont différents."})
        } else {
            setInputError("")
            await userServices.changePassword(values.password, props.email)
        }
    }

    const handleErrors = (err : FieldValues) => {
        console.log(err)
    }
    return (
        <div id={"form-container flex h-screen"}>
            <form onSubmit={handleSubmit(onSubmit, handleErrors)} className={"flex flex-col items-center gap-y-2"}>
                <InputCustom
                    id={"password"}
                    name={"password"}
                    type={"password"}
                    register={register}
                    error={password}
                    required={true}
                    label={"Nouveau mot de passe"}
                />

                <InputCustom
                id={"passwordCheck"}
                name={"passwordCheck"}
                type={"passwordCheck"}
                register={register}
                error={passwordCheck}
                required={true}
                label={"Validation nouveau mot de passe"}
                />

                <span className={"text-destructive"}>{inputError}</span>
                <Button>Valider</Button>
            </form>
        </div>
    )
}

export default ResetPasswordForm