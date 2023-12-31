import {useState} from "react";
import {useForm, FieldValues} from "react-hook-form";
import {useNavigate} from "react-router-dom";
//ui
import {useToast} from "../../@/components/ui/use-toast.ts";
import InputCustom from "../ui/inputForm/InputCustom.tsx";
import {Button} from "../../@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../@/components/ui/dialog.tsx";
import {Input} from "../../@/components/ui/input.tsx";
//services
import {userServices} from "../../services/userServices.ts";
import {setUser} from "../../utils/userGetter.ts";

const LoginForm = () => {
    const [emailForgot, setEmailForgot] = useState("")
    const navigate = useNavigate()
    const {register, formState: {errors: {email, password}}, handleSubmit} = useForm()
    const [error, setError] = useState<boolean>(false)
    const {toast} = useToast()

    const sendEmail = () => {
        if (emailForgot.length !== 0) {
            userServices.getCodeEmail(emailForgot)
        }

    }

    const onSubmit = (values : FieldValues) => {
        const email = values.email
        const password = values.password
        userServices.login({email: email, password: password})
            .then((user) => {
                if (user !== undefined) {
                    setError(false)
                    localStorage.setItem("token", user.token)
                    setUser(user.user)
                    if (user.user.role === 0) {
                        navigate("/admin")
                    } else {
                        navigate("/user")
                    }
                } else {
                    toast({title : "Mauvais mot de passe", description: "Veuillez réessayer."})
                    setError(true)
                }

            })
    }

    const handleErrors = (err : FieldValues) => {
        console.log(err)
    }
    return (
    <div id="form-container">
        <form onSubmit={handleSubmit(onSubmit, handleErrors)} className={"flex flex-col items-center gap-y-2"}>

            {error ?
                <span className={"text-destructive"}>Informations invalides</span>
                : null}

            <InputCustom
                id={"email"}
                register={register}
                name={"email"}
                error={email}
                patternMessage={"Email incorrect"}
                typeInput={"email"}
                required={true}
                label="Email *"
                //onChange={(e) => setValue("email", e.target.value)}
            />

            <InputCustom
                id={"password"}
                name={"password"}
                type={"password"}
                register={register}
                error={password}
                required={true}
                label={"Mot de passe"}
            />

            <Button type={"submit"} variant={"outline"}>Valider</Button>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"ghost"} className={"text-blue-300"}>Mot de passe oublié ?</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Demande de réinitialisation du mot de passe</DialogTitle>
                        <DialogDescription>
                            Nous vous enverrons un lien par email pour réinitialiser votre mot de passe.
                        </DialogDescription>
                    </DialogHeader>

                    <Input value={emailForgot} onChange={(e) => setEmailForgot(e.target.value)}/>

                    <Button type="button" onClick={() => sendEmail()}>Envoyer</Button>
                </DialogContent>
            </Dialog>
        </form>
    </div>
    )
}

export default LoginForm