import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import AuthNavbar from "../components/navbar/AuthNavbar"


const AuthLayout = () => {
  return (
    <div>
      <div className="fixed top-10 left-16 ">
        <AuthNavbar />
      </div>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default AuthLayout
