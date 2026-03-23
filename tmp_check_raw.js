
const API_KEY = "AIzaSyBxLau4hMpYr-jh38Qf69Z9q7wxY9o_GSM";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function checkRaw() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "hi" }] }]
      })
    });
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Body:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

checkRaw();
