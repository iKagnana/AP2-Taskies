const url = "http://localhost:8080/tasks/"

//#region Type
type Task = {
    index: number
    title: string
    status: string
    assignee: string
    desc?: string
    comment?: string
    pole: string
}

//#region GET
const getTasksByPole  = async (pole: string) => {
    try {
        const response = await fetch(url + pole, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const getTasksByAssignee = async (assignee: string) => {
    try {
        const response = await fetch(url + assignee, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

//#region POST
const addTasks = async (task: Task) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(task)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

//#region PUT
const updateTaskById = async (id: string, task: Task) => {
    try {
        const response = await fetch(url + id, {
            method: "PUT",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(task)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

//#region DELETE
const deleteTaskById = async (id: string) => {
    try {
        const response = await fetch(url + id, {
            method: "DELETE",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
export const tasksService = {
    getTasksByAssignee,
    getTasksByPole,
    addTasks,
    updateTaskById,
    deleteTaskById
}