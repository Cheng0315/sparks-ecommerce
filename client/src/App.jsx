import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage, UserRegistrationPage, LoginPage, UserProfilePage} from './pages';
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
          <Route path="/users/:id" element={<UserProfilePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
