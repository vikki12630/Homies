import { useAppSelector } from "../hooks/reduxHooks"

const Messages = () => {
  const userdata = useAppSelector(state => state.user)
  console.log(userdata)
  return (
    <div>Messages</div>
  )
}

export default Messages