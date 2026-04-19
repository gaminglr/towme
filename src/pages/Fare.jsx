import { useApp } from '../context/AppContext';
import { Button, Card } from '../components/UI';
import { vehicles, towTypes } from '../data/mockData';

export default function Fare() {
  const { booking, driver, goToConfirmed, navigate } = useApp();
  
  const vehicle = vehicles.find(v => v.id === booking.vehicleType);
  const towType = towTypes.find(t => t.id === booking.towType);

  const handleConfirm = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-[#ff6b00] p-6 pb-10 rounded-b-3xl">
        <button 
          onClick={() => navigate('/booking')}
          className="text-white/80 mb-4 flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Confirm Fare</h1>
        <p className="text-white/80 mt-1">Review before booking</p>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        <Card>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {vehicle?.icon || '🚗'}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{driver.name}</h3>
              <p className="text-gray-500 text-sm">{driver.vehicle} • {driver.plate}</p>
              <p className="text-gray-400 text-xs">{driver.phone}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-[#ff6b00]">₹{driver.fare}</div>
              <p className="text-gray-500 text-xs">{driver.eta}</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg mb-4">Trip Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Pickup</span>
              <span className="font-medium">{booking.pickup}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Drop</span>
              <span className="font-medium">{booking.drop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle</span>
              <span className="font-medium">{vehicle?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tow Type</span>
              <span className="font-medium">{towType?.name}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Base Fare ({vehicle?.name})</span>
                <span className="font-medium">₹{vehicle?.basePrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Tow Type ({towType?.name})</span>
                <span className="font-medium">×{towType?.multiplier}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Distance</span>
                <span className="font-medium">~{Math.round(booking.distance || 0)} km</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold">Total Fare</span>
                <span className="text-xl font-bold text-[#ff6b00]">₹{driver.fare}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-blue-700 text-sm text-center">
            💰 Flat fare - no hidden charges
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button onClick={handleConfirm}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}