export const APP_NAME = "Fuse Finder Pro";

export const YEARS = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

export const MAKES = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", 
  "BMW", "Mercedes-Benz", "Volkswagen", "Audi", "Hyundai", 
  "Kia", "Subaru", "Mazda", "Lexus", "Jeep", "Tesla"
];

// Mapped popular models for all supported makes
export const POPULAR_MODELS: Record<string, string[]> = {
  "Toyota": ["Camry", "Corolla", "RAV4", "Tacoma", "Highlander", "Tundra", "4Runner"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline"],
  "Ford": ["F-150", "Mustang", "Explorer", "Escape", "Focus", "Edge", "Bronco"],
  "Chevrolet": ["Silverado", "Equinox", "Malibu", "Tahoe", "Camaro", "Suburban", "Traverse"],
  "Nissan": ["Altima", "Rogue", "Sentra", "Pathfinder", "Frontier", "Maxima"],
  "BMW": ["3 Series", "5 Series", "X3", "X5", "M3", "X1", "7 Series"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "CLA"],
  "Volkswagen": ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "ID.4"],
  "Audi": ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Kona"],
  "Kia": ["Optima", "Forte", "Sorento", "Sportage", "Telluride", "Soul"],
  "Subaru": ["Outback", "Forester", "Crosstrek", "Impreza", "Ascent", "WRX"],
  "Mazda": ["Mazda3", "Mazda6", "CX-5", "CX-30", "CX-9", "MX-5 Miata"],
  "Lexus": ["RX", "ES", "NX", "IS", "GX", "UX"],
  "Jeep": ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Gladiator", "Renegade"],
  "Tesla": ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"]
};

export const DEFAULT_MODELS = ["Model A", "Model B", "Model C"];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Fuse Finder', path: '/fuse' },
  { name: 'Dash Lights', path: '/dashboard' },
  { name: 'Maintenance', path: '/maintenance' },
  { name: 'Tire Check', path: '/tire' },
  { name: 'Oil Check', path: '/oil' },
  { name: 'Report', path: '/report' },
];
