import { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { login } from "../storeAndSlices/userSlice";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const userPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.post(
        "users/login",
        { userId, password },
        config
      );
      dispatch(
        login({
          ...user,
          token: response?.data?.accessToken,
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
      navigate("/home")
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error(err.message);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-slate-500 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <h3 className="text-3xl font-serif underline">LOGIN</h3>
        <form onSubmit={loginFormSubmit} className="flex flex-col gap-3">
          <label htmlFor="userId" className="hidden" />
          <input
            type="text"
            placeholder="username or email"
            id="userId"
            value={userId}
            onChange={userIdHandler}
            className="text-xl py-2 px-3 rounded-md text-center placeholder:text-gray-400"
          />
          <label htmlFor="password" className="hidden" />
          <input
            type="text"
            placeholder="password"
            id="password"
            value={password}
            onChange={userPasswordHandler}
            className="text-xl py-2 px-3 rounded-md text-center placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="text-xl py-2 px-3 rounded-md bg-slate-900 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
