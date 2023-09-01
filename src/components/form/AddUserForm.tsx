import {useForm, FieldValues} from "react-hook-form";
//ui
import InputCustom from "../ui/inputForm/InputCustom.tsx";
import {Button} from "../../@/components/ui/button.tsx";
import SelectCustom from "../ui/inputForm/SelectCustom.tsx";
import {SelectItem} from "../../@/components/ui/select.tsx";
//services
import {userServices} from "../../services/userServices.ts";
//data
import {poles} from "../../utils/data.ts";
const LoginForm = () => {
    const {register, formState: {errors: {lastname, firstname, email, password}}, handleSubmit, setValue} = useForm()

    const onSubmit = (values : FieldValues) => {
        const newUser = {
            firstname : values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            pole: values.pole,
            role: parseInt(values.role)
        }
        userServices.addUser(newUser)
        console.log(newUser)
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
                        required={true}
                        label="Nom *"
                        //onChange={(e) => setValue("email", e.target.value)}
                    />

                    <InputCustom
                        id={"firstname"}
                        name={"firstname"}
                        register={register}
                        error={firstname}
                        required={true}
                        label={"Prénom *"}
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
                        required={true}
                        label="Email *"
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
                </div>

                <div className={"flex gap-4 w-full"}>
                    <SelectCustom
                        required={true}
                        label={"Pole"}
                        id={"pole"}
                        register={register}
                        name={"pole"}
                        onChange={(value) => setValue("pole", value)}
                        render={poles.map((pole) => (
                            <SelectItem value={pole.name}>{pole.name}</SelectItem>
                        ))}
                    />

                    <SelectCustom
                        required={true}
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

                        ]}/>
                </div>


                <Button type={"submit"} variant={"outline"}>Valider</Button>
            </form>
        </div>
    )
}

export default LoginForm