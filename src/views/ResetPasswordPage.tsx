import {useEffect, useState} from "react";
import {useParams, Navigate, useNavigate} from "react-router-dom";
//component
import ResetPasswordForm from "../components/form/ResetPasswordForm.tsx";
//ui
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "../@/components/ui/card.tsx";
import {Toaster} from "../@/components/ui/toaster.tsx";
//service
import {codeEmailService} from "../services/codeEmail.ts";
import {getUser} from "../utils/userGetter.ts";

const ResetPasswordPage = () => {
    const [valide, setValide] = useState(true)
    const [email, setEmail] = useState("")
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(params)
        valideCode()
    }, [])

    const valideCode = async () => {
        if (params.code == undefined) {
            navigate("/*")
        } else if (params.code == "token") {
            console.log("beep")
            const token = localStorage.getItem("token")
            if (token !== undefined) {
                const user = getUser()
                setEmail(user.email)
                setValide(true)
            } else {
                navigate("/*")
            }
        } else{
            const response = await codeEmailService.getCodeEmailByCode(params.code.slice(3))
            setValide(response.active)
            setEmail(response.user)
            setTimeout(() => {
                console.log("oui")
                codeEmailService.desactivadeCode(response._id)
            }, 5000)
        }
    }

    return (
        <div id="page-container" className={"flex h-screen"}>
            {valide ? (
                <>
                    <div id="sidebar" className="flex flex-col bg-accent p-52 w-2/4">
                    </div>
                    <div id="form-container" className={"flex justify-center items-center w-1/2"}>
                        <Card className={"p-5"}>
                            <CardHeader>
                                <CardTitle>Réinitialisation du mot de passe</CardTitle>
                                <CardDescription>Taskies</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResetPasswordForm email={email}/>
                            </CardContent>
                        </Card>
                    </div>
                </>
            ) :
                <Navigate to={"/"}/>
            }
            <Toaster/>
        </div>
    )
}

export default ResetPasswordPage