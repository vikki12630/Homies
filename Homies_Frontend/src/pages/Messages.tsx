import { useAppSelector } from "../hooks/reduxHooks";

const Messages = () => {
  const user = useAppSelector((state) => state.user);
  console.log(user)
  return (
    <div>Messages</div>
  )
}

export default Messages