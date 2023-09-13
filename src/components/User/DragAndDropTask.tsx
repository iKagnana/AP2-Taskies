import {useState, useEffect} from "react";

//component
import TaskForm from "../form/TaskForm.tsx";
//ui
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import {StrictModeDroppable} from "./DnD/StrictModeDroppable.tsx";
import ItemDnd from "./DnD/Item.tsx";
import {Button} from "../../@/components/ui/button.tsx";
import {
    Dialog,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogContent
} from "../../@/components/ui/dialog.tsx";
//icon
import {XCircle, CircleDashed, CheckCircle} from "lucide-react";
//service
import {tasksService} from "../../services/taskServices.ts";
//type
import {Task} from "../../utils/type.ts";

const DragAndDropTask = () => {
    const [openAdd, setOpenAdd] = useState<boolean>(false)
    const [tasks, setTasks] = useState<Task[]>([])
    const user = localStorage.getItem("user")
    useEffect(() => {
        fetchData()
        console.log(localStorage.getItem("user"))
    }, [])

    const fetchData = async () => {
        const response = await tasksService.getTasksByAssignee("Task TEST")
        setTasks(response)
    }

    return (
        <div id={"page-container flex-col"}>
            <div className={"flex justify-end"}>
                <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpenAdd(true)} >Création d'utilisateur</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Création d'une nouvelle tâche</DialogTitle>
                        </DialogHeader>
                        <TaskForm status={"add"}/>
                    </DialogContent>
                </Dialog>
            </div>
            <DragDropContext onDragEnd={(result) => console.log(result)}>
                <div className={"p-5 flex justify-evenly"}>
                    <div
                        id={"todo"}
                        className={"border border-black w-[450px] h-[630px]"}>
                        <div className={"text-xl border-b border-b-black w-full flex justify-around items-center p-3"}>
                            <span>À faire</span>
                            <XCircle className={"text-red-500 w-10 h-10"}/>
                        </div>
                        <StrictModeDroppable droppableId={"todo"}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {tasks.map((data) => (
                                        <ItemDnd task={data}/>
                                    ))}
                                </div>
                            )}
                        </StrictModeDroppable>
                    </div>
                    <div
                        id={"inProgress"}
                        className={"border border-black w-[450px] h-[630px]"}>
                        <div className={"text-xl border-b border-b-black w-full flex justify-around items-center p-3"}>
                            <span>En cours</span>
                            <CircleDashed className={"text-orange-400 w-10 h-10"}/>
                        </div>
                        <Droppable droppableId={"inProgress"}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div
                        id={"completed"}
                        className={"border border-black w-[450px] h-[630px]"}>
                        <div className={"text-xl border-b border-b-black w-full flex justify-around items-center p-3"}>
                            <span>Terminées</span>
                            <CheckCircle className={"text-green-700 w-10 h-10"}/>
                        </div>
                        <Droppable droppableId={"todo"}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
}

export default DragAndDropTask