const url = "http://localhost:8080/users/"

//#region Type
type User = {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    pole: string;
    role: number;

}

type Login = {
    email: string;
    password: string;
}


//#region GET
const getUsers = async () => {
    try {
        const response = await fetch(url, {
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
};

const getUsersByPole = async (pole: string) => {
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
};

const getUsersById = async (id : string) => {
    try {
        const response = await fetch(url + id, {
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
};

//#region POST
const addUser = async (user : User)=> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const login = async (login: Login) => {
    try {
        const response = await fetch(url + "login", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(login)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const changePassword = async (password: string, email: string ) => {
    try {
        const response = await fetch(url + "password/", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({password: password, email: email})
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const updateUserById = async (user: User, id: string) => {
    try {
        const response = await fetch(url + id, {
            method: "PUT",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const deleteUserById = async (id: string) => {
    try {
        const response = await fetch(url + id, {
            method: "DELETE",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const userServices = {
    getUsers,
    getUsersByPole,
    getUsersById,
    addUser,
    changePassword,
    login,
    updateUserById,
    deleteUserById
}