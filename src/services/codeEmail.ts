import {Params} from "react-router-dom";

const url = "http://localhost:8080/codeEmail/"

//#region GET
const getCodeEmailByCode = async (code: string) => {
    try {
        const response = await fetch(url + code, {
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
const desactivadeCode = async (id: string) => {
    try {
        const response = await fetch(url + id, {
            method: "POST",
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

export const codeEmailService = {
    getCodeEmailByCode,
    desactivadeCode
}