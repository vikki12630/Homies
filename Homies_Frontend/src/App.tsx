import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { login } from "./storeAndSlices/userSlice";

function App() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const getCurrentUser = async () => {
    try {
      const response = await axiosPrivate.get("users/getcurrentuser");
      console.log(response);
      dispatch(
        login({
          ...user,
          _id: response?.data?.userData?._id,
          name: response?.data?.userData?.name,
          userName: response?.data?.userData?.userName,
          email: response?.data?.userData?.email,
          profileImg: response?.data?.userData?.profileImg,
          followers: response?.data?.userData?.follower,
          following: response?.data?.userData?.following,
          isAuthenticated: true,
        })
      );
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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/" element={<AuthLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
