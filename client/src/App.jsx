import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserRegistrationPage from "./pages/userRegistration/index.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<UserRegistrationPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
