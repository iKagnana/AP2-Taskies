import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../@/components/ui/button.tsx";
import {AppContext} from "../utils/context.tsx";
import LoginForm from "../components/form/LoginForm.tsx";
import {ArrowLeft} from "lucide-react"

const Login = () => {
    const {state} = useContext(AppContext)
    const navigate = useNavigate()
    console.log(state)

    return (
        <>
            <div id="login-container" className="flex h-screen">
                <div id="sidebar" className="flex flex-col bg-accent p-52 w-2/4">
                        <h1 className={"text-3xl"}>Connectez vous à votre espace</h1>
                        <span>Espace {state.pole}</span>
                </div>
                <div id="form-container" className="flex flex-col items-center justify-center w-2/3 relative">
                    <div className={"absolute top-0 p-1 left-0"}>
                        <Button onClick={() => navigate("/")}><ArrowLeft/></Button>
                    </div>
                    <div className={"flex flex-col items-center mb-5"}>
                        <h1 className={"text-3xl"}>Taskies</h1>
                        <span className={"text-secondary-foreground"}>By GSB</span>
                    </div>

                    <LoginForm />
                </div>
            </div>
        </>
    )
}

export default Login