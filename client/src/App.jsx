import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage, UserRegistrationPage, LoginPage, UserProfilePage, AccountPage, EditEmailPage } from './pages';
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
          <Route path="/account" element={<AccountPage />}/>
          <Route path="/users/:userId" element={<UserProfilePage />}/>
          <Route path="/account/edit-email" element={<EditEmailPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
