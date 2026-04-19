import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LoadingDots } from '../components/UI';
import { findNearestDriver, markDriverBusy, vehicles, towTypes, generateETA, calculateFare } from '../data/mockData';

export default function Finding() {
  const { booking, setBooking, setDriver, goToFare } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      const nearestDriver = findNearestDriver(booking.pickupCoords);
      
      if (!nearestDriver) {
        console.log('No available drivers');
        return;
      }
      
      markDriverBusy(nearestDriver.id);
      
      const vehicle = vehicles.find(v => v.id === booking.vehicleType);
      const towType = towTypes.find(t => t.id === booking.towType);
      
      const fare = calculateFare(vehicle, towType, nearestDriver.distance);
      
      const eta = generateETA(nearestDriver.distance);
      
      setDriver({
        id: nearestDriver.id,
        name: nearestDriver.name,
        phone: nearestDriver.phone,
        vehicle: nearestDriver.vehicle,
        plate: nearestDriver.plate,
        eta,
        fare: fare.toString()
      });
      
      goToFare();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-32 h-32 bg-[#ff6b00] rounded-full flex items-center justify-center mb-8 animate-pulse">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h.01M15 10h.01M9.5 15.5s1.5 1 2.5 1 2.5-1 2.5-1" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Finding Nearby Tow...</h2>
      <p className="text-gray-500 text-center mb-6">
        Searching for the nearest tow truck for your {booking.vehicleType}
      </p>

      <LoadingDots />

      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm mb-4">Please wait...</p>
        <button 
          onClick={() => window.history.back()}
          className="text-[#ff6b00] font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
