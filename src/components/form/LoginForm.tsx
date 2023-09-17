import {useForm, FieldValues} from "react-hook-form";
import {useNavigate} from "react-router-dom";
//ui
import {useToast} from "../../@/components/ui/use-toast.ts";
import InputCustom from "../ui/inputForm/InputCustom.tsx";
import {Button} from "../../@/components/ui/button.tsx";
//services
import {userServices} from "../../services/userServices.ts";
import {setUser} from "../../utils/userGetter.ts";

const LoginForm = () => {
    const navigate = useNavigate()
    const {register, formState: {errors: {email, password}}, handleSubmit} = useForm()
    const {toast} = useToast()

    const onSubmit = (values : FieldValues) => {
        const email = values.email
        const password = values.password
        userServices.login({email: email, password: password})
            .then((user) => {
                if (user !== undefined) {
                    toast({title : "Connexion réussie", description : "Bienvenu dans votre espace"})
                    localStorage.setItem("token", user.token)
                    setUser(user.user)
                    if (user.pole === "Administration") {
                        navigate("/admin")
                    } else {
                        navigate("/user")
                    }
                }

            })
    }

    const handleErrors = (err : FieldValues) => {
        console.log(err)
    }
    return (
    <div id="form-container">
        <form onSubmit={handleSubmit(onSubmit, handleErrors)} className={"flex flex-col items-center gap-y-2"}>

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
        </form>
    </div>
    )
}

export default LoginForm