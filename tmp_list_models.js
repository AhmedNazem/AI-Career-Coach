
const API_KEY = "AIzaSyBxLau4hMpYr-jh38Qf69Z9q7wxY9o_GSM";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listAll() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Models:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

listAll();
