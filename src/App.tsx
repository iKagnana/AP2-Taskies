import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css'

//components
import Login from "./views/Login.tsx";
import ResetPasswordPage from "./views/ResetPasswordPage.tsx";
import ErrorPage from "./views/ErrorPage.tsx";
////admin
import HomePageAdmin from "./views/Admin/HomePageAdmin.tsx";
import UsersPage from "./views/Admin/UsersPage.tsx";


function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path={"/"}>
                  <Route index element={<Navigate to={"/connexion"} replace/>}/>
                  <Route path="/connexion" element={<Login/>}/>
                  <Route path="/reset-password/:code" element={<ResetPasswordPage/>}/>
              </Route>
              <Route path={"/admin"}>
                  <Route index element={<HomePageAdmin/>}/>
                  <Route path={"/admin/utilisateurs"} element={<UsersPage/>}/>
              </Route>
              <Route path={"*"} element={<ErrorPage/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
