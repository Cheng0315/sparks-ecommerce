import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>Welcome { user ? user.firstName : ""}</div>
  )
}

export default HomePage;