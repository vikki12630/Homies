import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
  const axiosPrivate = useAxiosPrivate()

  const logoutUser = async () => {
    try {
      const response = await axiosPrivate.get("users/logout");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>home</h1>
      <button onClick={logoutUser}>logout</button>
    </div>
  )
}

export default Home