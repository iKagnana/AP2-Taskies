import {useState, useEffect} from "react";

//component
import TaskForm from "../form/TaskForm.tsx";
//ui
import {DragDropContext, DropResult} from "react-beautiful-dnd"
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
import {getUser} from "../../utils/userGetter.ts";
//type
import {Task} from "../../utils/type.ts";

const DragAndDropTask = () => {
    const [openAdd, setOpenAdd] = useState<boolean>(false)
    const [tasks, setTasks] = useState<Task[]>([])
    const user = getUser()
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let response
        switch (user.role) {
            case 0:
            case 1:
                response = await tasksService.getTasksByPole("")
                break
            case 2:
                response = await tasksService.getTasksByPole(user.pole)
                break
            case 3:
                response = await tasksService.getTasksByAssignee(user.firstname + " " + user.lastname)

        }
        console.log(response)
        setTasks(response)
    }

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result
        console.log("result : ", result)

        // on récupère la tâche qui va être modifiée
        const target = tasks.find((task) => task["status"] === source?.droppableId && task["index"] === source?.index)
        console.log(target)

        if (target && target._id && destination) {
            // modifie la tâche en base de donnée
            tasksService.changeStatusTaskById(target._id, destination?.index, destination?.droppableId)
            fetchData()
        }

    }

    return (
        <div id={"page-container"}>
            <div className={"flex justify-end"}>
                <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpenAdd(true)} >Création d'une tâche</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Création d'une nouvelle tâche</DialogTitle>
                        </DialogHeader>
                        <TaskForm status={"add"} index={tasks.length} closeDialog={() => setOpenAdd(false)} fetchData={fetchData} />
                    </DialogContent>
                </Dialog>
            </div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <div className={"p-5 flex justify-evenly"}>
                    <div
                        id={"todo"}
                    >
                        <div className={"text-xl border border-black w-full flex justify-around items-center p-3"}>
                            <span>À faire</span>
                            <XCircle className={"text-red-500 w-10 h-10"}/>
                        </div>
                        <StrictModeDroppable droppableId={"todo"}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'skyblue' : undefined }}
                                    className={"border border-black w-[450px] h-[590px]"}
                                >
                                    {tasks.map((data) => {
                                        if (data.status === "todo") {
                                           return <ItemDnd task={data} fetchData={fetchData}/>
                                        }
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </StrictModeDroppable>
                    </div>
                    <div
                        id={"inProgress"}>
                        <div className={"text-xl border border-black w-full flex justify-around items-center p-3"}>
                            <span>En cours</span>
                            <CircleDashed className={"text-orange-400 w-10 h-10"}/>
                        </div>
                        <StrictModeDroppable droppableId={"inProgress"}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'skyblue' : undefined }}
                                    className={"border border-black w-[450px] h-[590px]"}
                                >
                                    {tasks.map((data) => {
                                        if (data.status === "inProgress") {
                                            return <ItemDnd task={data} fetchData={fetchData}/>
                                        }
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </StrictModeDroppable>
                    </div>
                    <div
                        id={"completed"}>
                        <div className={"text-xl border border-black w-full flex justify-around items-center p-3"}>
                            <span>Terminées</span>
                            <CheckCircle className={"text-green-700 w-10 h-10"}/>
                        </div>
                        <StrictModeDroppable droppableId={"completed"}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? "skyblue"  : undefined }}
                                    className={"border border-black w-[450px] h-[590px]"}
                                >
                                    {tasks.map((data) => {
                                        if (data.status === "completed") {
                                            return <ItemDnd task={data} fetchData={fetchData}/>
                                        }
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </StrictModeDroppable>
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
}

export default DragAndDropTask