import {Select, SelectContent, SelectTrigger, SelectValue} from "../../../@/components/ui/select.tsx";
import {Label} from "../../../@/components/ui/label.tsx";
import {UseFormRegister, FieldError, FieldValues, FieldErrorsImpl, Merge} from "react-hook-form";

type Props = {
    id: string
    orientation? : string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    name: string
    required?: boolean
    onChange?: (value: string) => void
    render: JSX.Element[]
    label: string
}

const SelectCustom = (props: Props) => {
    return (
        <div className={props.orientation === "horizontal" ? "flex w-full" : "flex flex-col w-full"}>
            <Label htmlFor={props.id} className={props.error ? "text-destructive pb-1" : " pb-1"}>{props.label}</Label>
            <Select
                {...props.register(props.name, {
                    required: props.required
                })}
                onValueChange={props.onChange}
            >
                <SelectTrigger>
                    <SelectValue placeholder={""}/>
                </SelectTrigger>
                <SelectContent>
                    {props.render}
                </SelectContent>
            </Select>
            <span className={"test-destructive"}>
                {props.error ? "Champ obligatoire" : ""}
            </span>
        </div>
    )
}

export default SelectCustom