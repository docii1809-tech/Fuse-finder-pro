import { VehicleImage } from '../types';

// Curated list of high-quality vehicle images from Unsplash to ensure professional presentation
// This replaces the unreliable Wikipedia API fetcher.
const CAR_IMAGES: Record<string, string> = {
  "Toyota": "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=1000",
  "Honda": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000",
  "Ford": "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&q=80&w=1000",
  "Chevrolet": "https://images.unsplash.com/photo-1532268116505-8c59cc37d2e6?auto=format&fit=crop&q=80&w=1000",
  "Nissan": "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=1000",
  "BMW": "https://images.unsplash.com/photo-1555215696-99ac45e43d34?auto=format&fit=crop&q=80&w=1000",
  "Mercedes-Benz": "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
  "Volkswagen": "https://images.unsplash.com/photo-1498887960847-2a5e46312788?auto=format&fit=crop&q=80&w=1000",
  "Audi": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000",
  "Hyundai": "https://images.unsplash.com/photo-1582260654763-9568972dc070?auto=format&fit=crop&q=80&w=1000",
  "Kia": "https://images.unsplash.com/photo-1594537125272-358c569a473e?auto=format&fit=crop&q=80&w=1000",
  "Subaru": "https://images.unsplash.com/photo-1626668893632-6f3a4e46303f?auto=format&fit=crop&q=80&w=1000",
  "Mazda": "https://images.unsplash.com/photo-1517153192968-3a479b4a4579?auto=format&fit=crop&q=80&w=1000",
  "Lexus": "https://images.unsplash.com/photo-1563720360172-67b8f3dcebb8?auto=format&fit=crop&q=80&w=1000",
  "Jeep": "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=1000",
  "Tesla": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=1000",
  "Generic": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000"
};

/**
 * Fetches vehicle images.
 * Replaced flaky Wikipedia API with robust static Unsplash mapping.
 */
export const fetchCarImages = async (year: string, make: string, model: string): Promise<VehicleImage[]> => {
  // Normalize make to match keys
  const normalizedMake = Object.keys(CAR_IMAGES).find(key => key.toLowerCase() === make.toLowerCase()) || 'Generic';
  const imageUrl = CAR_IMAGES[normalizedMake];

  // Return a promise to maintain interface compatibility
  return Promise.resolve([
    {
      url: imageUrl,
      source: 'Unsplash',
      attribution: `Photo of ${normalizedMake} via Unsplash`,
      license: 'Unsplash License'
    }
  ]);
};