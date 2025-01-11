import { useSelector } from "react-redux";

const HomePage = () => {
  /* user object from redux store */
  const user = useSelector((state) => state.user.user);

  return (
    <div >Welcome { user ? user.firstName : ""}</div>
  )
}

export default HomePage;