const url = "https://test.klemens-galus.fr/tasks/"
//const url = "http://localhost:8080/tasks/"

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
const getTasks  = async () => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "authorization" : "Bearer " + token
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const getTasksByPole  = async (pole: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(url+ "pole/" + pole, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "authorization" : "Bearer " + token
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const getTasksByAssignee = async (assignee: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(url + "assignee/" + assignee, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "authorization" : "Bearer " + token
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

//#region POST
const addTasks = async (task: Task) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "authorization" : "Bearer " + token
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
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(url + id, {
            method: "PUT",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "authorization" : "Bearer " + token
            },
            body : JSON.stringify(task)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const changeStatusTaskById = async (id: string, index: number, status: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(url + "/status/" + id, {
            method: "PUT",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "authorization" : "Bearer " + token
            },
            body : JSON.stringify({index: index, status: status})
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

//#region DELETE
const deleteTaskById = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(url + id, {
            method: "DELETE",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "authorization" : "Bearer " + token
            },
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}
export const tasksService = {
    getTasks,
    getTasksByAssignee,
    getTasksByPole,
    addTasks,
    updateTaskById,
    changeStatusTaskById,
    deleteTaskById
}