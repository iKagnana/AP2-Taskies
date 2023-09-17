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

//icon
import { Pen } from 'lucide-react';

import {Task} from "../../../utils/type.ts";
import {Button} from "../../../@/components/ui/button.tsx";
import TaskForm from "../../form/TaskForm.tsx";
import {set} from "react-hook-form";

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
        <div>
            <Draggable draggableId={props.task?.title} index={props.task?.index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger>
                                <div id={"dnd-item"} className={""}>
                                    <span>{props.task?.title}</span>
                                </div>
                            </DialogTrigger>
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
                                                    <TaskForm
                                                        id={props.task._id}
                                                        index={props.task.index}
                                                        defaultValues={props.task}
                                                        closeDialog={() => setOpenForm(false)}
                                                        fetchData={props.fetchData}
                                                        status={"update"}
                                                    />
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </DialogHeader>
                                <div className={"flex flex-col gap-2"}>
                                    <span>Assigné à : {props.task?.assignee}</span>
                                    <span>Description</span>
                                    <div className={"h-28 w-full border"}>
                                        {props.task?.desc}
                                    </div>
                                    <span>Fichiers concernés : </span>
                                    <div className={"h-28 w-full border"}>
                                        <ul>
                                            {props.task.files ? props.task.files.map((file) => (
                                                <li>{file}</li>
                                            )) : ""}
                                        </ul>
                                    </div>
                                    <span>Commentaire</span>
                                    <div className={"h-28 w-full border"}>
                                        {props.task?.comment}
                                    </div>

                                    <Button variant={"ghost"} className={"text-destructive"} onClick={() => deleteTask()}>Supprimer la tâche</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default ItemDnd