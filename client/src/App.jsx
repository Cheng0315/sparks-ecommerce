import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/homePage";
import UserRegistrationPage from "./pages/userRegistrationPage";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/register" element={<UserRegistrationPage />}/>
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
