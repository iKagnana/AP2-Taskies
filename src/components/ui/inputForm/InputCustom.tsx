import {Input} from "../../../@/components/ui/input.js";
import {Label} from "../../../@/components/ui/label.js";
import {UseFormRegister, FieldError, FieldValues, FieldErrorsImpl, Merge} from "react-hook-form";



type Props = {
    register : UseFormRegister<FieldValues>
    error? : FieldError | Merge<FieldError, FieldErrorsImpl>
    name: string
    helperText?: string
    label: string
    id: string
    pattern?: RegExp
    required?: boolean
    patternMessage?: string
    onChange?: (e : React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    typeInput?: string
    orientation?: string
    value?: string
    disabled?: boolean
}
const InputCustom = (props : Props) => {
   const getPattern = () => {
        if (props.typeInput !== undefined) {
            switch (props.typeInput) {
                case "email" :
                    return {
                        value:
                            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                        message: "Email incorrect."
                    }
                case "password" :
                    return {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message: "Votre mot de passe doit comporter au minimum 8 caractères avec une majuscule, une minuscule, un chiffre et un caractère spécial."
                    }

                default:
                    break
            }
        }
    }

    return (
        <div className={props.orientation === "horizontal" ? "flex" : "flex-col"}>
            <Label htmlFor={props.id} className={props.error ? "text-destructive" : ""}>{props.label}</Label>
            <Input
                disabled={props.disabled}
                id={props.id}
                {...props.register(props.name, {
                    required: props.required,
                    pattern: props.typeInput ? getPattern() : props.pattern,
                    onChange: props.onChange
                })}
                type={props.type}
                value={props.value}
            />
            <span className={"text-destructive"}>
                {props.error ? (props.error.type === "pattern" ? props.patternMessage  : "Champ obligatoire") : ""}
            </span>
        </div>
    )
}

export default InputCustom