import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage, UserRegistrationPage, LoginPage } from './pages';

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
