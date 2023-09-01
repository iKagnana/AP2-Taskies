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
}
const InputCustom = (props : Props) => {
   const getPattern = () => {
        if (props.typeInput !== undefined) {
            switch (props.typeInput) {
                case "email" :
                    return { value :
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message : "Email incorrect"
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
                id={props.id}
                {...props.register(props.name, {
                    required: props.required,
                    pattern: props.typeInput ? getPattern() : props.pattern,
                    onChange: props.onChange
                })}
                type={props.type}
            />
            <span className={"text-destructive"}>
                {props.error ? (props.error.type === "pattern" ? props.patternMessage  : "Champ obligatoire") : ""}
            </span>
        </div>
    )
}

export default InputCustom