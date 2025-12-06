import { VehicleImage } from '../types';

/**
 * Fetches vehicle images using the Wikipedia API.
 * Uses a heuristic approach to find the page and extract the main image.
 */
export const fetchCarImages = async (year: string, make: string, model: string): Promise<VehicleImage[]> => {
  const searchTerm = `${make} ${model}`;
  
  try {
    // 1. Search for the Wikipedia page
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.query?.search?.length) {
      return getFallbackImages();
    }

    const pageTitle = searchData.query.search[0].title;

    // 2. Get page info and main image
    const detailsUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages|images&pithumbsize=1000&format=json&origin=*`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const pages = detailsData.query?.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];

    const images: VehicleImage[] = [];

    // Add main thumbnail if available
    if (page.thumbnail) {
      images.push({
        url: page.thumbnail.source,
        source: 'Wikipedia',
        attribution: `Source: Wikipedia (${pageTitle})`,
        license: 'CC BY-SA'
      });
    }

    // If we have no images, fallback
    if (images.length === 0) {
      return getFallbackImages();
    }

    return images;

  } catch (error) {
    console.error("Error fetching vehicle images:", error);
    return getFallbackImages();
  }
};

const getFallbackImages = (): VehicleImage[] => {
  return [
    {
      url: 'https://picsum.photos/800/600?grayscale',
      source: 'Placeholder',
      attribution: 'Generic Placeholder',
      license: 'Public Domain'
    }
  ];
};
