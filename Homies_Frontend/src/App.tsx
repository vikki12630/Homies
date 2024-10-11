import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { auth, setUser } from "./storeAndSlices/userSlice";
import AppLayout from "./components/AppLayout";
import Messages from "./pages/Messages";

function App() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await axiosPrivate.get("users/getcurrentuser");
      // console.log(response?.data.userData);
      dispatch(auth(true));
      dispatch(setUser(response?.data.userData));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
