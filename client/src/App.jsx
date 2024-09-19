import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserRegistrationPage from "./pages/userRegistration";
import HomePage from "./pages/homePage";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/register" element={<UserRegistrationPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
