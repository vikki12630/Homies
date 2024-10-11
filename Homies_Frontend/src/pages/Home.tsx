import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const logoutUser = async () => {
    try {
      const response = await axiosPrivate.get("users/logout");
      console.log(response);
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <h1>home</h1>
        <button onClick={logoutUser}>logout</button>
      </div>
      <Link to={"/messages"}>messages</Link>
    </div>
  );
}

export default Home