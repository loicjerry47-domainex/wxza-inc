export const hubs = [
  { 
    id: 'downtown', 
    name: 'Downtown Central Hub', 
    available: 12, 
    total: 50, 
    distance: '0.3 mi',
    services: ['parking', 'charging', 'wash', 'residence'],
    rating: 4.8,
    amenities: ['EV Charging', 'Valet', '24/7 Security', 'Micro-Apartments']
  },
  { 
    id: 'midtown', 
    name: 'Midtown Business District', 
    available: 8, 
    total: 40, 
    distance: '0.7 mi',
    services: ['parking', 'charging', 'maintenance'],
    rating: 4.6,
    amenities: ['Fast Charging', 'Express Service', 'Conference Rooms']
  },
  { 
    id: 'airport', 
    name: 'Airport Transit Hub', 
    available: 25, 
    total: 100, 
    distance: '12.5 mi',
    services: ['parking', 'charging', 'wash', 'maintenance', 'residence'],
    rating: 4.9,
    amenities: ['Long-term Parking', 'Premium Suites', 'Shuttle Service']
  },
  { 
    id: 'riverside', 
    name: 'Riverside Leisure Hub', 
    available: 18, 
    total: 35, 
    distance: '2.1 mi',
    services: ['parking', 'scooter', 'residence'],
    rating: 4.7,
    amenities: ['Waterfront Views', 'E-Scooter Fleet', 'Luxury Stays']
  }
];

export const vehicles = [
  { id: 'tesla-3', name: 'Tesla Model 3', type: 'Electric', battery: 78, location: 'Downtown Hub' },
  { id: 'bike-1', name: 'E-Bike #247', type: 'E-Bike', battery: 92, location: 'Available' },
  { id: 'scooter-1', name: 'E-Scooter #156', type: 'E-Scooter', battery: 65, location: 'Riverside Hub' }
];

export const services = [
  { 
    id: 'parking', 
    name: 'Premium Parking', 
    price: '$12/hr', 
    description: 'Secure parking with 24/7 monitoring',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'charging', 
    name: 'EV Fast Charging', 
    price: '$0.35/kWh', 
    description: 'Ultra-fast 350kW charging stations',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'wash', 
    name: 'Vehicle Detailing', 
    price: '$45', 
    description: 'Professional wash and detailing service',
    color: 'from-purple-500 to-indigo-500'
  },
  { 
    id: 'maintenance', 
    name: 'Quick Maintenance', 
    price: '$85/hr', 
    description: 'On-site vehicle maintenance and repairs',
    color: 'from-orange-500 to-red-500'
  }
];

export const residences = [
  {
    id: 'studio-1',
    name: 'Downtown Studio',
    type: 'Studio',
    price: '$180/night',
    amenities: ['WiFi', 'Kitchen', 'Parking'],
    rating: 4.8,
    available: true
  },
  {
    id: 'suite-1',
    name: 'Airport Executive Suite',
    type: 'Executive Suite',
    price: '$320/night',
    amenities: ['WiFi', 'Kitchen', 'Office', 'Parking', 'Concierge'],
    rating: 4.9,
    available: true
  }
];