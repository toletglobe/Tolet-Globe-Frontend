import { Route, Routes } from "react-router-dom"
import {Layout,Admin, LoginLayout} from "./index"


const Main = () => {
  return (
    
      <Routes>
        <Route path="/*" element={<Layout/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/login/*" element={<LoginLayout/>}/>
      </Routes>
    
  )
}

export default Main
