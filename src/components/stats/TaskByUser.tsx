import {useState, useEffect} from "react";
//chart
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
//service
import {tasksService} from "../../services/taskServices.ts";

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
    assignee: string
}

const TaskByUser = (props: Props) => {
    const [labels] = useState<string[]>(["À faire", "En cours", "Terminée"])
    const [data, setData] = useState({labels: labels, datasets: []})

    useEffect(() => {
        fetchData()
    })
    const fetchData = async () => {
        //création d'un tableau vide
        const dataByTask: number[] = new Array(3).fill(0)
        const response = await tasksService.getTasksByAssignee(props.assignee)
        for (const task of response) {
            switch (task.status) {
                case "todo" :
                    dataByTask[0] = dataByTask[0] + 1
                    break
                case "inProgress":
                    dataByTask[1] = dataByTask[1] + 1
                    break
                case "completed":
                    dataByTask[2] = dataByTask[2] + 1
                    break
            }
        }
        console.log(dataByTask)

        // make data for chart
        const newData = {
            labels: labels,
            datasets: [
                {
                    label: "# nombre de tâche",
                    data: dataByTask,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderWidth: 1
                }
            ]
        }

        setData(newData)
    }
    return (
        <>
            <Doughnut data={data}/>
        </>
    )
}

export default TaskByUser