export const vehicles = [
  { id: 'bike', name: 'Bike', icon: '🏍️', basePrice: 399 },
  { id: 'car', name: 'Car', icon: '🚗', basePrice: 799 },
  { id: 'suv', name: 'SUV', icon: '🚙', basePrice: 999 },
  { id: 'truck', name: 'Truck', icon: '🚚', basePrice: 1499 },
];

export const towTypes = [
  { id: 'full', name: 'Full Tow', multiplier: 1.0 },
  { id: 'half', name: 'Half Tow', multiplier: 0.7 },
  { id: 'container', name: 'Container', multiplier: 1.4 },
];

export const mockDrivers = [
  { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', vehicle: 'Tata 407', plate: 'DL 01 AB 1234', rating: 4.8, online: true, busy: false, location: { lat: 28.6139, lng: 77.2090 } },
  { id: 2, name: 'Suresh Patel', phone: '+91 98765 43211', vehicle: 'Mahindra Bolero', plate: 'MH 12 CD 5678', rating: 4.5, online: true, busy: false, location: { lat: 28.6304, lng: 77.2177 } },
  { id: 3, name: 'Amit Singh', phone: '+91 98765 43212', vehicle: 'Ashok Leyland', plate: 'UP 16 EF 9012', rating: 4.9, online: true, busy: false, location: { lat: 28.5921, lng: 77.2265 } },
  { id: 4, name: 'Vijay Sharma', phone: '+91 98765 43213', vehicle: 'Eicher', plate: 'DL 05 GH 3456', rating: 4.7, online: true, busy: false, location: { lat: 28.6548, lng: 77.1903 } },
  { id: 5, name: 'Deepak Rao', phone: '+91 98765 43214', vehicle: 'Tata 407', plate: 'HR 26 IJ 7890', rating: 4.6, online: true, busy: false, location: { lat: 28.5754, lng: 77.2100 } },
];

export const simulateDelay = (ms = 1500) => new Promise(resolve => setTimeout(resolve, ms));

const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const findNearestDriver = (pickupLocation) => {
  const availableDrivers = mockDrivers.filter(d => d.online && !d.busy);
  
  if (availableDrivers.length === 0) {
    return null;
  }

  let nearestDriver = null;
  let minDistance = Infinity;

  for (const driver of availableDrivers) {
    const distance = calculateDistance(
      pickupLocation.lat,
      pickupLocation.lng,
      driver.location.lat,
      driver.location.lng
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestDriver = { ...driver, distance };
    }
  }

  return nearestDriver;
};

export const markDriverBusy = (driverId) => {
  const driver = mockDrivers.find(d => d.id === driverId);
  if (driver) {
    driver.busy = true;
  }
};

export const generateETA = (distance) => {
  const mins = Math.ceil(distance * 3) + 5;
  return `${mins} mins`;
};

export const calculateFare = (vehicle, towType, distance) => {
  const base = vehicle.basePrice;
  const fare = base * towType.multiplier * distance;
  return Math.round(fare);
};
