import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export function AppProvider({ children }) {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    phone: '',
    name: '',
    dob: '',
    gender: ''
  });

  const [booking, setBooking] = useState({
    pickup: '',
    drop: '',
    pickupCoords: { lat: 0, lng: 0 },
    dropCoords: { lat: 0, lng: 0 },
    vehicleType: '',
    towType: '',
    distance: 0
  });

  const [payment, setPayment] = useState({
    method: '',
    status: ''
  });

  const [driver, setDriver] = useState({
    id: null,
    name: '',
    phone: '',
    vehicle: '',
    plate: '',
    eta: '',
    fare: ''
  });

  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');
  const goToBooking = () => navigate('/booking');
  const goToFinding = () => navigate('/finding');
  const goToFare = () => navigate('/fare');
  const goToConfirmed = () => navigate('/confirmed');

  return (
    <AppContext.Provider value={{
      user, setUser,
      booking, setBooking,
      driver, setDriver,
      navigate,
      goToLogin,
      goToRegister,
      goToBooking,
      goToFinding,
      goToFare,
      goToConfirmed,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);