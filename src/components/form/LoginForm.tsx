import {useForm, FieldValues} from "react-hook-form";
import InputCustom from "../ui/inputForm/InputCustom.tsx";
import {Button} from "../../@/components/ui/button.tsx";

const LoginForm = () => {
    const {register, formState: {errors: {email, password}}, handleSubmit} = useForm()

    const onSubmit = (values : FieldValues) => {
    console.log(values)
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