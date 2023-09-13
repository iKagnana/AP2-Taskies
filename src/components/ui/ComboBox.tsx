import {useState} from "react"
import {UseFormRegister, FieldError, FieldValues, FieldErrorsImpl, Merge} from "react-hook-form";

//ican
import { ChevronsUpDown } from "lucide-react"

//ui
import {Label} from "../../@/components/ui/label.tsx";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
} from "../../@/components/ui/command.tsx"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../@/components/ui/popover"
import {Button} from "../../@/components/ui/button.tsx";

type Props = {
    value : string
    render: JSX.Element[]
    placeholder: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    label: string
    orientation? : string
    name: string
    open: boolean
    setOpen: (open: boolean) => void
    required: boolean
}
const Combobox = (props: Props) => {

    return (
        <div className={props.orientation === "horizontal" ? "flex w-full" : "flex flex-col w-full"}>
            <Label className={props.error ? "text-destructive pb-1" : "pb-1"}>{props.label}</Label>
            <Popover open={props.open} onOpenChange={() => props.setOpen(!props.open)}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={props.open}
                        className="w-[200px] justify-between"
                    >
                        {props.value || props.placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {props.render}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Combobox