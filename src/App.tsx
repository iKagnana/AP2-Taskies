import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'

//components
import ChoosePole from "./views/ChoosePole.tsx";
import Login from "./views/Login.tsx";

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<ChoosePole/>}/>
              <Route path="/connexion" element={<Login/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
