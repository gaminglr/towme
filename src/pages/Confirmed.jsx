import { useApp } from '../context/AppContext';
import { Button, Card } from '../components/UI';
import { vehicles, towTypes } from '../data/mockData';

export default function Confirmed() {
  const { booking, driver, setBooking, setDriver, navigate } = useApp();
  
  const vehicle = vehicles.find(v => v.id === booking?.vehicleType);
  const towType = towTypes.find(t => t.id === booking?.towType);

  const handleBookAnother = () => {
    setBooking({ pickup: '', drop: '', pickupCoords: { lat: 0, lng: 0 }, dropCoords: { lat: 0, lng: 0 }, vehicleType: '', towType: '', distance: 0 });
    setDriver({ id: null, name: '', phone: '', vehicle: '', plate: '', eta: '', fare: '' });
    navigate('/booking');
  };

  if (!booking) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-[#ff6b00] p-6 pb-10 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white">Booking Confirmed!</h1>
        <p className="text-white/80 mt-1">Driver is on the way</p>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl text-green-600">✓</span>
          </div>
          <h2 className="text-xl font-bold text-green-600">Tow Truck Assigned!</h2>
          <p className="text-gray-500 mt-2">Driver is arriving soon</p>
        </div>

        <Card>
          <h3 className="font-semibold text-lg mb-4">Driver Details</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <p className="font-semibold text-lg">{driver.name}</p>
              <p className="text-gray-500 text-sm">⭐ 4.8 rating</p>
              <p className="text-gray-400 text-xs">{driver.phone}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Truck</span>
              <span className="font-medium">{driver.vehicle} ({driver.plate})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ETA</span>
              <span className="font-semibold text-[#ff6b00]">{driver.eta}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg mb-4">Trip Summary</h3>
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
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Total Fare</span>
              <span className="text-xl font-bold text-[#ff6b00]">₹{driver.fare}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t space-y-3">
        <Button onClick={() => alert('Calling driver...')}>
          📞 Call Driver
        </Button>
        <Button variant="secondary" onClick={handleBookAnother}>
          Book Another
        </Button>
      </div>
    </div>
  );
}