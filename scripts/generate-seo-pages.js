/**
 * Static SEO Page Generator
 * Run with: node scripts/generate-seo-pages.js
 * 
 * This script generates static HTML files for long-tail keywords to improve SEO.
 * It simulates a build process by creating a /dist/seo-pages/ directory structure.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../dist/seo-pages');
const SAMPLE_VEHICLES = [
  { year: '2020', make: 'Honda', model: 'Civic' },
  { year: '2019', make: 'Toyota', model: 'Camry' },
  { year: '2021', make: 'Ford', model: 'F-150' },
  { year: '2018', make: 'Chevrolet', model: 'Malibu' },
  { year: '2022', make: 'Tesla', model: 'Model 3' },
  { year: '2017', make: 'Nissan', model: 'Altima' },
  { year: '2015', make: 'Jeep', model: 'Wrangler' },
  { year: '2016', make: 'Subaru', model: 'Outback' },
  { year: '2023', make: 'Hyundai', model: 'Tucson' },
  { year: '2019', make: 'Ram', model: '1500' }
];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to create HTML content
const createHtml = (v) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${v.year} ${v.make} ${v.model} Fuse Box Diagram & Locations | Fuse Finder Pro</title>
  <meta name="description" content="Find the fuse box location and diagram for ${v.year} ${v.make} ${v.model}. View fuse charts, amperage ratings, and circuit maps for free.">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans">
  <header class="bg-slate-900 text-white p-4">
    <div class="container mx-auto">
      <h1 class="font-bold text-xl">Fuse Finder Pro</h1>
    </div>
  </header>
  
  <main class="container mx-auto px-4 py-8 max-w-4xl">
    <nav class="text-sm text-slate-500 mb-6">
      <a href="/" class="hover:text-blue-600">Home</a> > <span>${v.make}</span> > <span>${v.model}</span>
    </nav>

    <h1 class="text-3xl font-bold mb-4">${v.year} ${v.make} ${v.model} Fuse Box Info</h1>
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <p class="mb-4 text-lg">
        Need to find the fuse for the radio, cigarette lighter, or horn on your <strong>${v.year} ${v.make} ${v.model}</strong>? 
        Use our AI-powered tool to locate any fuse instantly.
      </p>
      
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <h2 class="font-bold text-blue-900 text-lg mb-2">Fuse Box Locations</h2>
        <ul class="list-disc pl-5 text-blue-800">
          <li><strong>Engine Compartment:</strong> Near the battery or driver's side fender.</li>
          <li><strong>Passenger Compartment:</strong> Under the dashboard (driver side) or behind the glove box.</li>
        </ul>
      </div>

      <a href="/#/fuse" class="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition">
        Launch Interactive Fuse Finder
      </a>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 class="font-bold mb-2">Common Fuses</h3>
        <ul class="space-y-2 text-sm">
          <li class="flex justify-between border-b pb-1"><span>Cigarette Lighter</span> <span class="font-mono bg-slate-100 px-1">15A</span></li>
          <li class="flex justify-between border-b pb-1"><span>Radio / Head Unit</span> <span class="font-mono bg-slate-100 px-1">10A</span></li>
          <li class="flex justify-between border-b pb-1"><span>Headlights (Low)</span> <span class="font-mono bg-slate-100 px-1">10A/15A</span></li>
          <li class="flex justify-between border-b pb-1"><span>Horn</span> <span class="font-mono bg-slate-100 px-1">10A</span></li>
        </ul>
      </div>
      
      <div class="bg-slate-100 p-6 rounded-xl border border-slate-200 flex items-center justify-center text-center">
         <div>
           <p class="font-bold text-slate-700 mb-2">Need a Diagram?</p>
           <p class="text-xs text-slate-500 mb-4">Interactive diagrams available in the app</p>
           <a href="/#/fuse" class="text-blue-600 font-bold text-sm hover:underline">View Diagram &rarr;</a>
         </div>
      </div>
    </div>
  </main>

  <footer class="bg-slate-900 text-slate-400 py-8 mt-12 text-center">
    <p>&copy; ${new Date().getFullYear()} Fuse Finder Pro</p>
  </footer>
</body>
</html>
`;

// Generate Pages
console.log(`Generating SEO pages in ${OUTPUT_DIR}...`);

SAMPLE_VEHICLES.forEach(v => {
  const filename = `${v.year}-${v.make}-${v.model}.html`.toLowerCase().replace(/ /g, '-');
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, createHtml(v));
  console.log(`Created: ${filename}`);
});

console.log('Done!');
