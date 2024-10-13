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
import { IUserData } from "./storeAndSlices/userSlice";

function App() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await axiosPrivate.get("users/getcurrentuser");
      const data: IUserData = {
        userData: {
          _id: response?.data.userData._id,
          name: response?.data.userData.name,
          userName: response?.data.userData.userName,
          email: response?.data.userData.email,
          profileImg: response?.data.userData.profileImg,
          followers: response?.data.userData.followers,
          following: response?.data.userData.following,
        },
        isAuthenticated: true,
      };
      dispatch(auth(data.isAuthenticated));
      dispatch(setUser(data.userData));
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
