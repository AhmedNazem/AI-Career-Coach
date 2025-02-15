import { Inngest } from "inngest";
export const inngest = new Inngest({
  id: "sensai",
  name: "Senssai",

  credentials: {
    gemini: {
      api: process.env.GEMINI_API_KEY,
    },
  },
});
