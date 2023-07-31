import LoginForm from "../components/form/LoginForm.tsx";

const Login = () => {
    return (
        <>
            <div id="login-container" className="flex h-screen">
                <div id="sidebar" className="flex flex-col bg-accent p-52 w-2/4">
                        <h1 className={"text-3xl"}>Connectez vous à votre espace</h1>
                </div>
                <div id="form-container" className="flex flex-col items-center justify-center w-2/3">
                    <div className={"flex flex-col items-center"}>
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