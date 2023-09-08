import {useEffect, useState} from "react";
import {useParams, Navigate} from "react-router-dom";
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

const ResetPasswordPage = () => {
    const [valide, setValide] = useState(true)
    const [email, setEmail] = useState("")
    const encodedEmail = useParams()

    useEffect(() => {
        if (encodedEmail) {
            const email = decodeURI(encodedEmail.toString())
            setEmail(email)
        } else {
            setValide(false)
        }
    }, [])

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

        </div>
    )
}

export default ResetPasswordPage