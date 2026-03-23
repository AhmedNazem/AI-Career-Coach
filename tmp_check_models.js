
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded for diagnostic purposes only
const API_KEY = "AIzaSyBxLau4hMpYr-jh38Qf69Z9q7wxY9o_GSM";

async function listModels() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro"
  ];

  for (const modelName of modelsToTry) {
    try {
      console.log(`Checking model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("hi");
      console.log(`SUCCESS [${modelName}]:`, result.response.text().substring(0, 50));
    } catch (error) {
      console.error(`FAILED [${modelName}]:`, error.message);
    }
  }
}

listModels();
