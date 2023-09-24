import {Label} from "../../../@/components/ui/label.tsx";
import {Textarea} from "../../../@/components/ui/textarea.tsx";
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
const TextareaCustom = (props : Props) => {
    return (
        <div className={props.orientation === "horizontal" ? "flex" : "flex-col"}>
            <Label htmlFor={props.id} className={props.error ? "text-destructive" : ""}>{props.label}</Label>
            <Textarea
                disabled={props.disabled}
                id={props.id}
                {...props.register(props.name, {
                    required: props.required,
                    onChange: props.onChange
                })}
                value={props.value}
            />
            <span className={"text-destructive"}>
                {props.error ? (props.error.type === "pattern" ? props.patternMessage  : "Champ obligatoire") : ""}
            </span>
        </div>
    )
}

export default TextareaCustom