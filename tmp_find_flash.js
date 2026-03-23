
const API_KEY = "AIzaSyBxLau4hMpYr-jh38Qf69Z9q7wxY9o_GSM";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function findFlash() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const flashes = data.models.filter(m => m.name.toLowerCase().includes('flash'));
    console.log("Flash models available:", flashes.map(m => m.name));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

findFlash();
