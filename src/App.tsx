import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css'

//components
import Login from "./views/Login.tsx";
import {ProtectedRoute} from "./components/router/ProtectedRoute.tsx";
import ResetPasswordPage from "./views/ResetPasswordPage.tsx";
import ErrorPage from "./views/ErrorPage.tsx";
import MyAccount from "./views/MyAccount.tsx";
////admin
import HomePageAdmin from "./views/Admin/HomePageAdmin.tsx";
import UsersPage from "./views/Admin/UsersPage.tsx";
////user
import HomePageUser from "./views/User/HomePageUser.tsx";


function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path={"/"}>
                  <Route index element={<Navigate to={"/connexion"} replace/>}/>
                  <Route path="/connexion" element={<Login/>}/>
                  <Route path="/reset-password/:code" element={<ResetPasswordPage/>}/>
                  <Route path={"/mon-compte"} element={<MyAccount/>}/>
              </Route>
              <Route path={"/admin"}>
                  <Route index element={<ProtectedRoute><HomePageAdmin/></ProtectedRoute>}/>
                  <Route path={"/admin/utilisateurs"} element={<ProtectedRoute><UsersPage/></ProtectedRoute>}/>
              </Route>
              <Route path={"/user"}>
                  <Route index element={<ProtectedRoute><HomePageUser/></ProtectedRoute>}/>
              </Route>
              <Route path={"*"} element={<ErrorPage/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
