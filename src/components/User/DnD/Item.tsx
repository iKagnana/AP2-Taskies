import {useState} from "react";

// ui
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

type Props = {
    task: Task
}

const ItemDnd = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [openForm, setOpenForm] = useState<boolean>(false)
    console.log(props)
    return (
        <div>
            <Draggable draggableId={props.task?.title} index={props.task?.index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Dialog>
                            <DialogTrigger>
                                <div id={"dnd-item"} className={""}>
                                    <span>{props.task?.title}</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <span id={"dialog-header-title"}>{props.task?.title} - {props.task?.pole}</span>
                                    <div id={"dialog-header-button"}>
                                        <Dialog open={openForm} onOpenChange={setOpenForm}>
                                            <DialogTrigger asChild>
                                                <Button onClick={() => setOpenForm(true)}><Pen/></Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Modification d'une nouvelle tâche</DialogTitle>
                                                    <TaskForm/>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </DialogHeader>
                                <div>
                                    <span>Assigné à : {props.task?.assignee}</span>
                                    <span>Description</span>
                                    <div className={"min-h-28 w-full border"}>
                                        {props.task?.desc}
                                    </div>
                                    <span>Fichiers concernés : </span>
                                    <div className={"min-h-28 w-full border"}>
                                        <ul>
                                            {props.task.files ? props.task.files.map((file) => (
                                                <li>{file}</li>
                                            )) : ""}
                                        </ul>
                                    </div>
                                    <span>Commentaire</span>
                                    <div className={"min-h-28 w-full border"}>
                                        {props.task?.comment}
                                    </div>
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