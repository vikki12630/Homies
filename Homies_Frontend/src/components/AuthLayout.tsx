import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../hooks/reduxHooks"

const AuthLayout = () => {
  const location = useLocation()
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  ); 
}

export default AuthLayout