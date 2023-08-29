import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css'

//components
import Login from "./views/Login.tsx";

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path={"/"}>
                  <Route index element={<Navigate to={"/connexion"} replace/>}/>
                  <Route path="/connexion" element={<Login/>}/>
              </Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
