import { Route, Routes } from "react-router-dom"
import Login from "./Login/Login"

const LoginLayout = () => {
  return (
    <div>
   
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default LoginLayout
