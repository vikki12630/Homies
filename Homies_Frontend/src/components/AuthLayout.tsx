import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../hooks/reduxHooks"

const AuthLayout = () => {
  const location = useLocation()
  const token = useAppSelector(state => state.user._id)
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  ); 
}

export default AuthLayout