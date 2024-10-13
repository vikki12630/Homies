import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "../api/axiosInstance";
import {
  accessToken,
  auth,
  IUserData,
  setUser,
} from "../storeAndSlices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { Link, useNavigate } from "react-router-dom";

type inputData = {
  name: string;
  userName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<inputData>({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signupFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.post(
        "users/signup",
        {
          name: formData.name,
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        },
        config
      );
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
        token: response?.data.accessToken,
        isAuthenticated: true,
      };
      dispatch(auth(data.isAuthenticated));
      dispatch(accessToken(data.token));
      dispatch(setUser(data.userData));
      navigate("/");
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
        <h3 className="text-3xl font-serif underline">SIGN-UP</h3>
        <form onSubmit={signupFormSubmit} className="flex flex-col gap-3">
          <label htmlFor="name" className="hidden" />
          <input
            type="text"
            placeholder="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={inputHandler}
            className="text-xl py-2 px-3 rounded-md text-center placeholder:text-gray-400"
          />
          <label htmlFor="userName" className="hidden" />
          <input
            type="text"
            placeholder="userName"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={inputHandler}
            className="text-xl py-2 px-3 rounded-md text-center placeholder:text-gray-400"
          />
          <label htmlFor="email" className="hidden" />
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={inputHandler}
            className="text-xl py-2 px-3 rounded-md text-center placeholder:text-gray-400"
          />
          <label htmlFor="password" className="hidden" />
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={inputHandler}
            className="text-xl py-2 px-3 rounded-md text-center placeholder:text-gray-400"
          />
          <div className="flex flex-col">
            <button
              type="submit"
              className="text-xl py-2 px-3 rounded-md bg-slate-900 text-white"
            >
              Signup
            </button>
            <Link to={"/login"} className="text-right text-s">
              Already have an account <span className="text- font-bold hover:underline">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
