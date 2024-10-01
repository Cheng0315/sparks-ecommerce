import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage, UserRegistrationPage, LoginPage, UserProfilePage, MyAccountPage, EditEmailPage } from './pages';
import { Navbar } from "./components";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        < Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/register" element={<UserRegistrationPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/my-account" element={<MyAccountPage />}/>
          <Route path="/users/:userId" element={<UserProfilePage />}/>
          <Route path="/my-account/edit-email" element={<EditEmailPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
