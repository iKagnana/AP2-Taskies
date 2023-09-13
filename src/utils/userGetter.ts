import {User} from "./type.ts";

export const setUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const getUser = () => {
    const user = localStorage.getItem("user")
    if (user) {
        return JSON.parse(user)
    } else {
        return null
    }

}