import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage, UserRegistrationPage, LoginPage, UserProfilePage, AccountPage, EditEmailPage, ChangePasswordPage, EditUserInfoPage } from './pages';
import { Navbar } from "./components";
import PrivateRoute from './components/PrivateRoute';

const App = () =>{
  return (
    <div className="app">
      <BrowserRouter>
        < Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/register" element={<UserRegistrationPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/users/:userId" element={<UserProfilePage />}/>
            <Route element={<PrivateRoute />}>
              <Route path="/account/edit-email" element={<EditEmailPage />}/>
              <Route path="/account/edit-info" element={<EditUserInfoPage />}/>
              <Route path="/account/change-password" element={<ChangePasswordPage />}/>
              <Route path="/account" element={<AccountPage />}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
