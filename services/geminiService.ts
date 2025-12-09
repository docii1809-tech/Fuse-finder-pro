import { GoogleGenAI } from "@google/genai";
import { AnalysisType, AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
// Initialize AI only if key is present to avoid immediate errors
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const analyzeImage = async (
  base64Image: string,
  type: AnalysisType,
  vehicleContext?: string
): Promise<AnalysisResult> => {
  
  const model = "gemini-2.5-flash"; 
  let prompt = "";

  switch (type) {
    case AnalysisType.TIRE:
      prompt = `Analyze this tire image for wear, damage, or dry rot. Estimate remaining tread life percentage. Vehicle context: ${vehicleContext || 'Unknown'}. Return JSON with: title, severity (low/medium/high/critical), description, recommendation, confidence (0-1).`;
      break;
    case AnalysisType.OIL:
      prompt = `Analyze this engine oil dipstick or cap image. Check for color (honey vs black vs milky), sludge, or metal particles. Vehicle context: ${vehicleContext || 'Unknown'}. Return JSON with: title, severity (low/medium/high/critical), description, recommendation, filterSuggestion (string: suggest specific oil filter part number or type compatible with this vehicle, e.g. "Fram PH6607" or "Bosch 3323"), confidence (0-1).`;
      break;
    case AnalysisType.DASHBOARD:
      prompt = `Identify the dashboard warning light(s) in this image. Explain what it means for a ${vehicleContext || 'car'}. Return JSON with: title, severity (low/medium/high/critical), description, recommendation, confidence (0-1).`;
      break;
  }

  // Handle case where API key is missing (DEMO MODE)
  if (!ai) {
    console.warn("No API Key found, using mock data for demonstration.");
    return mockAnalysis(type);
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as AnalysisResult;

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    // Throw error so UI can display it
    throw new Error(error.message || "AI Analysis failed. Please try again.");
  }
};

export const generateMaintenanceSchedule = async (vehicleStr: string, mileage: string): Promise<any> => {
   if (!ai) return mockMaintenance();

   const prompt = `Generate a recommended maintenance schedule for a ${vehicleStr} with ${mileage} miles. 
   Return a JSON array of objects with keys: item, interval, status (pending/urgent), costEstimate. 
   Focus on OEM recommendations. Limit to 5-7 key items.`;

   try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
   } catch (error: any) {
       console.error("Maintenance Schedule Error:", error);
       throw new Error("Failed to generate schedule. Please try again later.");
   }
}

export const findFuse = async (vehicleStr: string, query: string): Promise<any> => {
    if (!ai) return mockFuseResult(query);

    // Updated prompt to request locationCategory for the diagram
    const prompt = `For a ${vehicleStr}, where is the fuse for "${query}" located? 
    Return a JSON object with: 
    - boxLocation (string text description)
    - locationCategory (enum: 'engine_bay', 'driver_dash', 'passenger_dash', 'trunk', 'unknown')
    - fuseNumber
    - amperage
    - circuit
    - description
    Keep it concise.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        return JSON.parse(response.text || "{}");
    } catch (error: any) {
        console.error("Fuse Finder Error:", error);
        throw new Error("Failed to locate fuse info. Please try a different query.");
    }
}

// MOCK DATA FALLBACKS (Used ONLY when API key is missing)
const mockAnalysis = (type: AnalysisType): AnalysisResult => ({
  title: `${type === AnalysisType.TIRE ? 'Tire' : type === AnalysisType.OIL ? 'Oil' : 'Dash'} Analysis (Demo)`,
  severity: "medium",
  description: "AI API Key not configured. This is a simulated result based on your input.",
  recommendation: "Please configure your API key to get real-time analysis from Gemini.",
  filterSuggestion: type === AnalysisType.OIL ? "Fram PH7317 or equivalent" : undefined,
  confidence: 0.95
});

const mockMaintenance = () => [
    { item: "Oil Change", interval: "5,000 miles", status: "urgent", costEstimate: "$50-90" },
    { item: "Tire Rotation", interval: "6,000 miles", status: "pending", costEstimate: "$20-40" },
    { item: "Cabin Air Filter", interval: "15,000 miles", status: "pending", costEstimate: "$30" },
];

const mockFuseResult = (q: string) => ({
    boxLocation: "Interior Fuse Box (Driver Side Kick Panel)",
    locationCategory: "driver_dash",
    fuseNumber: "14",
    amperage: "10A",
    circuit: q,
    description: `Fuse for ${q} typically located in the main junction block.`
});