import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Input, SelectCard } from '../components/UI';
import { vehicles, towTypes } from '../data/mockData';

export default function Booking() {
  const { booking, setBooking, goToFinding } = useApp();
  const [pickup, setPickup] = useState(booking.pickup || '');
  const [drop, setDrop] = useState(booking.drop || '');
  const [pickupCoords, setPickupCoords] = useState(booking.pickupCoords || { lat: 28.6139, lng: 77.2090 });
  const [dropCoords, setDropCoords] = useState(booking.dropCoords || { lat: 28.6428, lng: 77.2194 });
  const [selectedVehicle, setSelectedVehicle] = useState(booking.vehicleType ? vehicles.find(v => v.id === booking.vehicleType) : null);
  const [selectedTowType, setSelectedTowType] = useState(booking.towType ? towTypes.find(t => t.id === booking.towType) : null);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!pickup.trim()) {
      setError('Enter pickup location');
      return;
    }
    if (!drop.trim()) {
      setError('Enter drop location');
      return;
    }
    if (!selectedVehicle) {
      setError('Select vehicle type');
      return;
    }
    if (!selectedTowType) {
      setError('Select tow type');
      return;
    }
    setError('');
    setBooking({
      pickup,
      drop,
      pickupCoords,
      dropCoords,
      vehicleType: selectedVehicle.id,
      towType: selectedTowType.id,
      distance: 0
    });
    goToFinding();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-[#ff6b00] p-6 pb-12 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white">Book a Tow</h1>
        <p className="text-white/80 mt-1">Fast & reliable towing service</p>
      </div>

      <div className="px-4 -mt-8 space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#ff6b00]" />
            <Input
              placeholder="Pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          <div className="h-0.5 bg-gray-200 ml-1.5 w-0.5" />
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <Input
              placeholder="Drop Location"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Vehicle to Tow</h3>
          <div className="grid grid-cols-4 gap-3">
            {vehicles.map(v => (
              <SelectCard
                key={v.id}
                selected={selectedVehicle?.id === v.id}
                onClick={() => setSelectedVehicle(v)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{v.icon}</div>
                  <div className="text-xs font-medium text-gray-700">{v.name}</div>
                </div>
              </SelectCard>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Tow Type</h3>
          <div className="grid grid-cols-3 gap-3">
            {towTypes.map(t => (
              <SelectCard
                key={t.id}
                selected={selectedTowType?.id === t.id}
                onClick={() => setSelectedTowType(t)}
              >
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                </div>
              </SelectCard>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-center text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button 
          onClick={handleContinue}
          disabled={!pickup || !drop || !selectedVehicle || !selectedTowType}
        >
          Find Tow Truck
        </Button>
      </div>
    </div>
  );
}