import {useState} from "react";

// ui
import {useToast} from "../../../@/components/ui/use-toast.ts";
import { Draggable } from "react-beautiful-dnd"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../../@/components/ui/dialog.tsx";
import {Textarea} from "../../../@/components/ui/textarea.tsx";

//icon
import { Pen, Eye } from 'lucide-react';

import {Task} from "../../../utils/type.ts";
import {Button} from "../../../@/components/ui/button.tsx";
import TaskForm from "../../form/TaskForm.tsx";

//service
import {tasksService} from "../../../services/taskServices.ts";

type Props = {
    task: Task
    fetchData: () => void
}

const ItemDnd = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [openForm, setOpenForm] = useState<boolean>(false)
    const {toast} = useToast()

    const deleteTask = () => {
        if (props.task._id) {
            tasksService.deleteTaskById(props.task._id)
            toast({title: "Suppression", description : "Suppression de la tâche réussie"})
        }

    }

    return (
        <>
            <Draggable draggableId={props.task?.title} index={props.task?.index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className={"p-3"}>
                            <div id={"dnd-item"} className={"border rounded w-full flex justify-between p-3 items-center bg-white"}>
                                <div className={"flex flex-col items-start"}>
                                    <span className={"text-xl"}>{props.task?.title}</span>
                                    <span className={"text-blue-500"}>{props.task.pole} - {props.task.assignee}</span>
                                    <span className={"italic text-gray-500 text-ellipsis overflow-hidden h-[20px]"}>{props.task?.desc}</span>
                                </div>

                                    <Button
                                        onClick={() => setOpen(true)}
                                    >
                                        <Eye className={"w-4 h-4"}/>
                                    </Button>
                            </div>
                        </div>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent>
                                <DialogHeader className={"flex flex-row items-center justify-between p-3"}>
                                    <span id={"dialog-header-title"} className={"font-bold text-xl"}>{props.task?.title} - {props.task?.pole}</span>
                                    <div id={"dialog-header-button"}>
                                        <Dialog open={openForm} onOpenChange={setOpenForm}>
                                            <DialogTrigger asChild>
                                                <Button onClick={() => setOpenForm(true)}><Pen/></Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Modification d'une nouvelle tâche</DialogTitle>
                                                </DialogHeader>
                                                <TaskForm
                                                    id={props.task._id}
                                                    index={props.task.index}
                                                    defaultValues={props.task}
                                                    closeDialog={() => setOpen(false)}
                                                    fetchData={props.fetchData}
                                                    status={"update"}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </DialogHeader>
                                <div className={"flex flex-col gap-2"}>
                                    <span>Assigné à : {props.task?.assignee}</span>
                                    <span>Description</span>
                                    <Textarea className={"h-28 w-full border"} disabled={true}>
                                        {props.task?.desc}
                                    </Textarea>
                                    <span>Fichiers concernés : </span>
                                    <div className={"h-28 w-full border"}>
                                        <ul>
                                            {props.task.files ? props.task.files.map((file) => (
                                                <li>{file}</li>
                                            )) : ""}
                                        </ul>
                                    </div>
                                    <span>Commentaire</span>
                                    <Textarea className={"h-28 w-full border"} disabled={true}>
                                        {props.task?.comment}
                                    </Textarea>

                                    <Button variant={"ghost"} className={"text-destructive"} onClick={() => deleteTask()}>Supprimer la tâche</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </Draggable>
        </>
    )
}

export default ItemDnd