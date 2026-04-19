import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Finding from './pages/Finding';
import Fare from './pages/Fare';
import Payment from './pages/Payment';
import Confirmed from './pages/Confirmed';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white max-w-md mx-auto shadow-xl">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/finding" element={<Finding />} />
            <Route path="/fare" element={<Fare />} />
            <Route path="/confirmed" element={<Confirmed />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}