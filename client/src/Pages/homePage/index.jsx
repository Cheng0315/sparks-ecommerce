import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  /* user object from redux store */
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${user.userId}`);
  }
  return (
    <div onClick={handleClick}>Welcome { user ? user.firstName : ""}</div>
  )
}

export default HomePage;